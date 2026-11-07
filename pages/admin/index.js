import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'smtp' | 'campaign' | 'overview'

  // Leads State
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // SMTP State
  const [smtpConfig, setSmtpConfig] = useState({
    host: '',
    port: 587,
    secure: false,
    user: 'sales@managemyweb.co',
    pass: '',
    fromEmail: 'sales@managemyweb.co',
    fromName: 'ManageMyWeb Sales',
    isConfigured: false,
  });
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [smtpMsg, setSmtpMsg] = useState({ type: '', text: '' });
  const [testEmail, setTestEmail] = useState('sales@managemyweb.co');
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Campaign Settings State
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('mmw_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'manage2026') {
      sessionStorage.setItem('mmw_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      fetchAllData();
    } else {
      setAuthError('Incorrect passcode. Default passcode is "admin123"');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mmw_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    fetchLeads();
    fetchSmtp();
    fetchSettings();
  };

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (e) {
      console.error(e);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchSmtp = async () => {
    try {
      const res = await fetch('/api/admin/smtp');
      const data = await res.json();
      if (res.ok) {
        setSmtpConfig(data);
        if (data.user) setTestEmail(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (res.ok) setSettings(data);
    } catch (e) {
      console.error(e);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveLeadNote = async (id) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes: noteText }),
      });
      if (res.ok) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, notes: noteText } : l)));
        setEditingNoteId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const exportLeadsCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Store Name', 'Website', 'Category', 'Status', 'Message', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.storeName || ''}"`,
      `"${l.websiteUrl || ''}"`,
      `"${l.category || ''}"`,
      `"${l.status || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ManageMyWeb_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSmtp = async (e) => {
    e.preventDefault();
    setSmtpLoading(true);
    setSmtpMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/admin/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpConfig),
      });
      const data = await res.json();
      if (res.ok) {
        setSmtpMsg({ type: 'success', text: 'SMTP configuration saved.' });
        setSmtpConfig(data.config);
      } else {
        setSmtpMsg({ type: 'error', text: data.error || 'Failed to save SMTP settings.' });
      }
    } catch (err) {
      setSmtpMsg({ type: 'error', text: 'Network error saving SMTP.' });
    } finally {
      setSmtpLoading(false);
    }
  };

  const handleTestSmtp = async () => {
    setTestingSmtp(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail,
          host: smtpConfig.host,
          port: smtpConfig.port,
          secure: smtpConfig.secure,
          user: smtpConfig.user,
          pass: smtpConfig.pass,
          fromEmail: smtpConfig.fromEmail,
          fromName: smtpConfig.fromName,
        }),
      });
      const data = await res.json();
      setTestResult({
        success: res.ok && data.success,
        message: data.message || data.error,
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Network error communicating with SMTP test server.',
      });
    } finally {
      setTestingSmtp(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsMsg('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        setSettingsMsg('Campaign settings updated.');
      } else {
        setSettingsMsg(data.error || 'Failed to update settings.');
      }
    } catch (err) {
      setSettingsMsg('Network error.');
    } finally {
      setSettingsLoading(false);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      (l.name && l.name.toLowerCase().includes(query)) ||
      (l.email && l.email.toLowerCase().includes(query)) ||
      (l.storeName && l.storeName.toLowerCase().includes(query)) ||
      (l.message && l.message.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'New':
        return { background: '#FFF4E5', color: '#B25000', border: '1px solid #FFD599' };
      case 'Closed Won':
        return { background: '#E8F5E9', color: '#1D7D3F', border: '1px solid #B7E1CD' };
      case 'In Progress':
      case 'Contacted':
        return { background: '#EBF5FF', color: '#0066CC', border: '1px solid #B3D7FF' };
      default:
        return { background: '#F5F5F7', color: '#6E6E73', border: '1px solid #D2D2D7' };
    }
  };

  // ==============================================================
  // LOGIN SCREEN — CLASSIC APPLE MINIMAL CARD
  // ==============================================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F5F7',
          padding: '20px',
          color: '#1D1D1F',
        }}
      >
        <Head>
          <title>Studio Admin Sign In | ManageMyWeb</title>
        </Head>

        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            padding: '40px 36px',
            borderRadius: '22px',
            background: '#FFFFFF',
            border: '1px solid #D2D2D7',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#1D1D1F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
            ManageMyWeb Admin
          </h1>
          <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '24px' }}>
            Sign in to manage client prototype requests, SMTP email settings, and studio operations.
          </p>

          {authError && (
            <div
              style={{
                background: '#FFF2F2',
                border: '1px solid #FFD6D6',
                color: '#D70015',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Passcode (default: admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="ios-input"
              autoFocus
            />

            <button type="submit" className="btn-apple-blue" style={{ width: '100%', padding: '12px' }}>
              Sign In
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#0066CC', fontSize: '13px', textDecoration: 'none' }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==============================================================
  // AUTHENTICATED STUDIO DASHBOARD
  // ==============================================================
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F5F7',
        color: '#1D1D1F',
      }}
    >
      <Head>
        <title>Studio Operations Dashboard | ManageMyWeb</title>
      </Head>

      {/* Top Sticky Apple-Style Bar */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid #D2D2D7',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            height: '56px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect width="24" height="24" rx="6" fill="#1D1D1F" />
              <path
                d="M6.5 16.5V8.5L12 12.5L17.5 8.5V16.5"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ fontWeight: 600, fontSize: '15px', color: '#1D1D1F', letterSpacing: '-0.015em' }}>
              ManageMyWeb Control Center
            </span>
            <span
              style={{
                fontSize: '11.5px',
                color: '#1D7D3F',
                background: '#E8F5E9',
                padding: '3px 10px',
                borderRadius: '980px',
                fontWeight: 500,
              }}
            >
              ● Active
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                padding: '7px 14px',
                fontSize: '12.5px',
                fontWeight: 500,
                color: '#1D1D1F',
                background: '#F5F5F7',
                border: '1px solid #D2D2D7',
                borderRadius: '980px',
                textDecoration: 'none',
              }}
            >
              View Public Site ↗
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '7px 14px',
                fontSize: '12.5px',
                fontWeight: 500,
                color: '#D70015',
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '980px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '32px 24px 72px 24px' }}>
        {/* Top Summary KPI Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {[
            {
              label: 'Total Client Leads',
              value: leads.length,
              sub: 'All submitted inquiries',
            },
            {
              label: 'New / Unread',
              value: leads.filter((l) => (l.status || 'New') === 'New').length,
              sub: 'Awaiting prototype review',
            },
            {
              label: 'Active Prototypes',
              value: leads.filter((l) => l.status === 'In Progress' || l.status === 'Contacted').length,
              sub: 'Currently in progress',
            },
            {
              label: 'Email Dispatch (SMTP)',
              value: smtpConfig.isConfigured ? 'Connected' : 'Not Configured',
              sub: smtpConfig.fromEmail || 'sales@managemyweb.co',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '16px',
                padding: '20px 22px',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#6E6E73', marginBottom: '6px' }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '12px', color: '#86868B' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Classic Apple Segmented Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div className="segmented-control" style={{ background: '#E5E5EA' }}>
            {[
              { id: 'leads', label: `Client Leads (${leads.length})` },
              { id: 'smtp', label: 'SMTP Email Settings' },
              { id: 'campaign', label: 'Onboarding & Contact Info' },
              { id: 'overview', label: 'System Status' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`segment-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'leads' && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search name, email, or store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ios-input"
                style={{ width: '240px', padding: '8px 14px', fontSize: '13px', borderRadius: '980px' }}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ios-input"
                style={{ width: '150px', padding: '8px 14px', fontSize: '13px', borderRadius: '980px', background: '#FFFFFF', color: '#1D1D1F' }}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Archived">Archived</option>
              </select>

              <button
                onClick={fetchLeads}
                className="btn-apple-secondary"
                style={{ padding: '8px 16px', fontSize: '13px', background: '#FFFFFF', color: '#1D1D1F' }}
              >
                {leadsLoading ? 'Refreshing...' : 'Refresh'}
              </button>

              <button
                onClick={exportLeadsCSV}
                className="btn-apple-blue"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Export CSV
              </button>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: CLIENT LEADS TABLE                                      */}
        {/* ============================================================== */}
        {activeTab === 'leads' && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid #D2D2D7',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            {filteredLeads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 20px', color: '#6E6E73' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                  No matching inquiries
                </div>
                <p style={{ fontSize: '13.5px' }}>
                  Prototype requests submitted on the website appear here automatically.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr
                      style={{
                        background: '#F5F5F7',
                        borderBottom: '1px solid #D2D2D7',
                        color: '#6E6E73',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      <th style={{ padding: '14px 20px' }}>Client & Brand</th>
                      <th style={{ padding: '14px 20px' }}>Direct Contact</th>
                      <th style={{ padding: '14px 20px' }}>E-Commerce Category</th>
                      <th style={{ padding: '14px 20px' }}>Project Notes</th>
                      <th style={{ padding: '14px 20px' }}>Status</th>
                      <th style={{ padding: '14px 20px' }}>Internal Notes & Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, idx) => {
                      const waDigits = (lead.phone || '').replace(/[^0-9]/g, '');
                      const badgeStyle = getStatusBadgeStyle(lead.status || 'New');

                      return (
                        <tr
                          key={lead.id}
                          style={{
                            borderBottom: idx !== filteredLeads.length - 1 ? '1px solid #E5E5EA' : 'none',
                            verticalAlign: 'top',
                            background: '#FFFFFF',
                          }}
                        >
                          {/* Client & Brand */}
                          <td style={{ padding: '18px 20px' }}>
                            <div style={{ fontWeight: 600, color: '#1D1D1F', fontSize: '15px' }}>
                              {lead.name}
                            </div>
                            <div style={{ color: '#0066CC', fontWeight: 500, fontSize: '13.5px', marginTop: '2px' }}>
                              {lead.storeName || 'Store name not specified'}
                            </div>
                            {lead.websiteUrl && (
                              <a
                                href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: '#6E6E73',
                                  fontSize: '12.5px',
                                  textDecoration: 'none',
                                  display: 'inline-block',
                                  marginTop: '3px',
                                }}
                              >
                                {lead.websiteUrl} ↗
                              </a>
                            )}
                            <div style={{ fontSize: '11.5px', color: '#86868B', marginTop: '6px' }}>
                              {new Date(lead.createdAt).toLocaleDateString()} ·{' '}
                              {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>

                          {/* Direct Contact */}
                          <td style={{ padding: '18px 20px' }}>
                            <a
                              href={`mailto:${lead.email}`}
                              style={{ color: '#1D1D1F', textDecoration: 'none', display: 'block', fontWeight: 500 }}
                            >
                              {lead.email}
                            </a>
                            {lead.phone && (
                              <div style={{ color: '#6E6E73', fontSize: '12.5px', marginTop: '3px' }}>
                                {lead.phone}
                              </div>
                            )}
                            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                              {waDigits && (
                                <a
                                  href={`https://wa.me/${waDigits}?text=${encodeURIComponent(
                                    `Hello ${lead.name}, this is ManageMyWeb regarding your 3D store prototype request.`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    background: '#E8F5E9',
                                    color: '#1D7D3F',
                                    border: '1px solid #B7E1CD',
                                    padding: '4px 10px',
                                    borderRadius: '980px',
                                    fontSize: '11.5px',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                  }}
                                >
                                  WhatsApp
                                </a>
                              )}
                              <a
                                href={`mailto:${lead.email}?subject=${encodeURIComponent(
                                  'ManageMyWeb: Your 3D Storefront Prototype'
                                )}`}
                                style={{
                                  background: '#EBF5FF',
                                  color: '#0066CC',
                                  border: '1px solid #B3D7FF',
                                  padding: '4px 10px',
                                  borderRadius: '980px',
                                  fontSize: '11.5px',
                                  fontWeight: 500,
                                  textDecoration: 'none',
                                }}
                              >
                                Email
                              </a>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding: '18px 20px' }}>
                            <span
                              style={{
                                background: '#F5F5F7',
                                color: '#1D1D1F',
                                border: '1px solid #D2D2D7',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 500,
                                display: 'inline-block',
                                marginBottom: '6px',
                              }}
                            >
                              {lead.category || 'E-Commerce'}
                            </span>
                            <div style={{ fontSize: '11.5px', color: '#6E6E73' }}>
                              Code: <strong style={{ color: '#1D1D1F' }}>{lead.promoCode || 'FREE-3D-DEMO-60D'}</strong>
                            </div>
                            {lead.revenueRange && (
                              <div style={{ fontSize: '11.5px', color: '#86868B', marginTop: '2px' }}>
                                Scale: {lead.revenueRange}
                              </div>
                            )}
                          </td>

                          {/* Message */}
                          <td style={{ padding: '18px 20px', maxWidth: '320px' }}>
                            <div
                              style={{
                                background: '#F5F5F7',
                                padding: '10px 12px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                color: '#1D1D1F',
                                lineHeight: 1.5,
                                maxHeight: '110px',
                                overflowY: 'auto',
                              }}
                            >
                              {lead.message || 'No additional notes provided.'}
                            </div>
                          </td>

                          {/* Status */}
                          <td style={{ padding: '18px 20px' }}>
                            <select
                              value={lead.status || 'New'}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              style={{
                                ...badgeStyle,
                                borderRadius: '980px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                outline: 'none',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                              }}
                            >
                              <option value="New" style={{ background: '#FFFFFF', color: '#1D1D1F' }}>
                                New
                              </option>
                              <option value="Contacted" style={{ background: '#FFFFFF', color: '#1D1D1F' }}>
                                Contacted
                              </option>
                              <option value="In Progress" style={{ background: '#FFFFFF', color: '#1D1D1F' }}>
                                In Progress
                              </option>
                              <option value="Closed Won" style={{ background: '#FFFFFF', color: '#1D1D1F' }}>
                                Closed Won
                              </option>
                              <option value="Archived" style={{ background: '#FFFFFF', color: '#1D1D1F' }}>
                                Archived
                              </option>
                            </select>
                          </td>

                          {/* Notes & Actions */}
                          <td style={{ padding: '18px 20px', minWidth: '210px' }}>
                            {editingNoteId === lead.id ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <textarea
                                  rows={2}
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  className="ios-input"
                                  style={{ fontSize: '12.5px', padding: '8px' }}
                                  placeholder="Add internal studio note..."
                                />
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button
                                    onClick={() => saveLeadNote(lead.id)}
                                    className="btn-apple-blue"
                                    style={{ padding: '5px 12px', fontSize: '11.5px' }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingNoteId(null)}
                                    className="btn-apple-secondary"
                                    style={{ padding: '5px 12px', fontSize: '11.5px' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div
                                  style={{
                                    fontSize: '12.5px',
                                    color: lead.notes ? '#1D1D1F' : '#0066CC',
                                    marginBottom: '8px',
                                    cursor: 'pointer',
                                    lineHeight: 1.45,
                                  }}
                                  onClick={() => {
                                    setEditingNoteId(lead.id);
                                    setNoteText(lead.notes || '');
                                  }}
                                >
                                  {lead.notes || '+ Add internal note'}
                                </div>
                                <button
                                  onClick={() => deleteLead(lead.id)}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#D70015',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontFamily: 'inherit',
                                  }}
                                >
                                  Delete Lead
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SMTP EMAIL CONFIGURATION                                */}
        {/* ============================================================== */}
        {activeTab === 'smtp' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                padding: '36px',
                borderRadius: '20px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                SMTP Server Credentials
              </h3>
              <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '24px' }}>
                Configure your outbound mail server to receive instant notifications at{' '}
                <strong style={{ color: '#1D1D1F' }}>sales@managemyweb.co</strong> whenever a client requests a 3D prototype.
              </p>

              {smtpMsg.text && (
                <div
                  style={{
                    background: smtpMsg.type === 'success' ? '#E8F5E9' : '#FFF2F2',
                    border: `1px solid ${smtpMsg.type === 'success' ? '#B7E1CD' : '#FFD6D6'}`,
                    color: smtpMsg.type === 'success' ? '#1D7D3F' : '#D70015',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    marginBottom: '20px',
                  }}
                >
                  {smtpMsg.text}
                </div>
              )}

              <form onSubmit={handleSaveSmtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      SMTP Host *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="smtp.gmail.com"
                      value={smtpConfig.host || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Port *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="587"
                      value={smtpConfig.port || 587}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, port: Number(e.target.value) })}
                      className="ios-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    SMTP Username / Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="sales@managemyweb.co"
                    value={smtpConfig.user || ''}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    SMTP Password / App Password *
                  </label>
                  <input
                    type="password"
                    placeholder={smtpConfig.hasPasswordSet ? '•••••••• (Enter new to change)' : 'App Password or SMTP Key'}
                    value={smtpConfig.pass || ''}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, pass: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Sender Name
                    </label>
                    <input
                      type="text"
                      placeholder="ManageMyWeb Sales"
                      value={smtpConfig.fromName || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, fromName: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Sender Email
                    </label>
                    <input
                      type="text"
                      placeholder="sales@managemyweb.co"
                      value={smtpConfig.fromEmail || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="smtpSecure"
                    checked={smtpConfig.secure === true}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, secure: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#0071E3' }}
                  />
                  <label htmlFor="smtpSecure" style={{ fontSize: '13px', color: '#424245', cursor: 'pointer' }}>
                    Use SSL / TLS (Required for port 465)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={smtpLoading}
                  className="btn-apple-blue"
                  style={{ marginTop: '8px', padding: '12px' }}
                >
                  {smtpLoading ? 'Saving...' : 'Save SMTP Configuration'}
                </button>
              </form>
            </div>

            {/* Diagnostic Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  padding: '36px',
                  borderRadius: '20px',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                  Send Diagnostic Test Email
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5, marginBottom: '20px' }}>
                  Verify your outbound SMTP connection by sending a live test message.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Recipient Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sales@managemyweb.co"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="ios-input"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTestSmtp}
                  disabled={testingSmtp || !testEmail}
                  className="btn-apple-dark"
                  style={{ width: '100%', padding: '12px' }}
                >
                  {testingSmtp ? 'Testing Connection...' : 'Send Test Email'}
                </button>

                {testResult && (
                  <div
                    style={{
                      marginTop: '18px',
                      background: testResult.success ? '#E8F5E9' : '#FFF2F2',
                      border: `1px solid ${testResult.success ? '#B7E1CD' : '#FFD6D6'}`,
                      color: testResult.success ? '#1D7D3F' : '#D70015',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>{testResult.success ? 'Success:' : 'Error:'}</strong> {testResult.message}
                  </div>
                )}
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  padding: '28px',
                  borderRadius: '20px',
                }}
              >
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Common Provider Settings
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '13px', color: '#424245', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>Google Workspace / Gmail:</strong> smtp.gmail.com (Port 587)
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>SendGrid:</strong> smtp.sendgrid.net (Port 587, user: apikey)
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>Mailgun:</strong> smtp.mailgun.org (Port 587)
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>Hostinger / cPanel:</strong> smtp.hostinger.com (Port 465 SSL)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CAMPAIGN & CONTACT SETTINGS                             */}
        {/* ============================================================== */}
        {activeTab === 'campaign' && settings && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              padding: '36px',
              borderRadius: '20px',
              maxWidth: '760px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
              Onboarding Program & Contact Channels
            </h3>
            <p style={{ color: '#6E6E73', fontSize: '13.5px', marginBottom: '24px' }}>
              Manage the 60-day onboarding window, available prototype slots, WhatsApp number, and sales email.
            </p>

            {settingsMsg && (
              <div
                style={{
                  background: '#E8F5E9',
                  border: '1px solid #B7E1CD',
                  color: '#1D7D3F',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}
              >
                {settingsMsg}
              </div>
            )}

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                  Program Title
                </label>
                <input
                  type="text"
                  value={settings.promo?.title || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      promo: { ...settings.promo, title: e.target.value },
                    })
                  }
                  className="ios-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                  Program Description
                </label>
                <textarea
                  rows={3}
                  value={settings.promo?.description || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      promo: { ...settings.promo, description: e.target.value },
                    })
                  }
                  className="ios-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Promotional Deadline Timestamp
                  </label>
                  <input
                    type="text"
                    value={settings.promo?.deadlineDate || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        promo: { ...settings.promo, deadlineDate: e.target.value },
                      })
                    }
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Prototype Slots Remaining
                  </label>
                  <input
                    type="number"
                    value={settings.promo?.slotsRemaining || 4}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        promo: { ...settings.promo, slotsRemaining: Number(e.target.value) },
                      })
                    }
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    WhatsApp Number (digits only)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappRaw || '923174075023'}
                    onChange={(e) => setSettings({ ...settings, whatsappRaw: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Sales Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail || 'sales@managemyweb.co'}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={settingsLoading}
                className="btn-apple-blue"
                style={{ padding: '12px 24px', alignSelf: 'flex-start' }}
              >
                {settingsLoading ? 'Saving...' : 'Save Campaign Settings'}
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SYSTEM OVERVIEW                                         */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              padding: '36px',
              borderRadius: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '10px' }}>
              Platform Architecture & Channels
            </h3>
            <p style={{ color: '#424245', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', maxWidth: '720px' }}>
              ManageMyWeb runs on Next.js with embedded 3D WebGL storefront previews, automated lead persistence (`data/leads.json`), and configurable SMTP email dispatch.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ background: '#F5F5F7', padding: '18px 20px', borderRadius: '14px' }}>
                <div style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '4px' }}>Primary Sales Email</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>sales@managemyweb.co</div>
              </div>
              <div style={{ background: '#F5F5F7', padding: '18px 20px', borderRadius: '14px' }}>
                <div style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '4px' }}>Direct WhatsApp Line</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>+92 317 4075023</div>
              </div>
              <div style={{ background: '#F5F5F7', padding: '18px 20px', borderRadius: '14px' }}>
                <div style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '4px' }}>Live 3D Preview Engine</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D7D3F' }}>Operational</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
