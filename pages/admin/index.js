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
    user: '',
    pass: '',
    fromEmail: '',
    fromName: 'ManageMyWeb Studio Concierge',
    isConfigured: false,
  });
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [smtpMsg, setSmtpMsg] = useState({ type: '', text: '' });
  const [testEmail, setTestEmail] = useState('');
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Campaign Settings State
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  // Check stored auth
  useEffect(() => {
    const auth = sessionStorage.getItem('mmw_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default master admin password
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

  // Lead Actions
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

  // SMTP Save
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
        setSmtpMsg({ type: 'success', text: 'SMTP configuration saved successfully!' });
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

  // SMTP Test Dispatch
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

  // Campaign Save
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
        setSettingsMsg('Campaign settings updated successfully!');
      } else {
        setSettingsMsg(data.error || 'Failed to update settings.');
      }
    } catch (err) {
      setSettingsMsg('Network error.');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Filtered Leads
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#060709',
          padding: '20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }}
      >
        <Head>
          <title>Admin Portal Login | ManageMyWeb</title>
        </Head>

        <div
          className="glass-panel"
          style={{
            maxWidth: '420px',
            width: '100%',
            padding: '40px',
            borderRadius: '32px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.14)',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px auto',
            }}
          >
            🔒
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            ManageMyWeb Admin
          </h2>
          <p style={{ color: '#86868B', fontSize: '13.5px', marginBottom: '24px' }}>
            Enter your passcode to manage SMTP, client leads, and promo deadline settings.
          </p>

          {authError && (
            <div
              style={{
                background: 'rgba(255, 69, 58, 0.15)',
                border: '1px solid rgba(255, 69, 58, 0.4)',
                color: '#FF6B6B',
                padding: '10px',
                borderRadius: '12px',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="password"
              placeholder="Enter passcode (default: admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="ios-input"
              autoFocus
            />

            <button type="submit" className="ios-btn-blue" style={{ width: '100%', padding: '13px' }}>
              Unlock Dashboard →
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#86868B', fontSize: '13px', textDecoration: 'none' }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060709',
        color: '#FFFFFF',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      <Head>
        <title>Studio Operations Dashboard | ManageMyWeb Admin</title>
      </Head>

      {/* Admin Top Header */}
      <header
        style={{
          background: 'rgba(12, 14, 22, 0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              ☕
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '16px' }}>ManageMyWeb Control Center</span>
              <span style={{ fontSize: '11px', color: '#30D158', marginLeft: '8px', fontWeight: 600 }}>
                ● Admin Session Active
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" target="_blank" className="ios-btn-secondary" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
              View Public Website ↗
            </Link>
            <button onClick={handleLogout} className="ios-btn-secondary" style={{ padding: '8px 16px', fontSize: '12.5px', color: '#FF6B6B' }}>
              Lock Dashboard
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { id: 'leads', label: `Contact Queries & 3D Leads (${leads.length})`, icon: '📬' },
            { id: 'smtp', label: 'SMTP Email Configuration', icon: '✉️' },
            { id: 'campaign', label: '60-Day Deadline & Campaign Settings', icon: '⏳' },
            { id: 'overview', label: 'Studio Metrics & Health', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`segment-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                borderRadius: '980px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: LEADS & CONTACT FORM QUERIES                            */}
        {/* ============================================================== */}
        {activeTab === 'leads' && (
          <div>
            {/* Header & Controls */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search leads by name, email, store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ios-input"
                  style={{ width: '280px', padding: '10px 16px', fontSize: '13.5px' }}
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="ios-input"
                  style={{ width: '160px', padding: '10px 16px', fontSize: '13.5px', background: '#12141F' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={fetchLeads} className="ios-btn-secondary" style={{ padding: '9px 16px', fontSize: '13px' }}>
                  Refresh 🔄
                </button>
                <button onClick={exportLeadsCSV} className="ios-btn-blue" style={{ padding: '9px 18px', fontSize: '13px' }}>
                  Export CSV 📥
                </button>
              </div>
            </div>

            {/* Leads Table Card */}
            <div
              className="glass-panel"
              style={{
                borderRadius: '26px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {filteredLeads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868B' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>📭</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>No inquiries match criteria</div>
                  <p style={{ fontSize: '13.5px' }}>Form submissions from the website will appear here in real time.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                    <thead>
                      <tr
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#86868B',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                        }}
                      >
                        <th style={{ padding: '16px 20px' }}>Founder & Store</th>
                        <th style={{ padding: '16px 20px' }}>Contact Channels</th>
                        <th style={{ padding: '16px 20px' }}>Category & Promo</th>
                        <th style={{ padding: '16px 20px' }}>Message / Vision</th>
                        <th style={{ padding: '16px 20px' }}>Status</th>
                        <th style={{ padding: '16px 20px' }}>Actions & Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead, idx) => {
                        const waRaw = (lead.phone || '').replace(/[^0-9]/g, '');
                        return (
                          <tr
                            key={lead.id}
                            style={{
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                              verticalAlign: 'top',
                            }}
                          >
                            {/* Founder & Store */}
                            <td style={{ padding: '18px 20px' }}>
                              <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>{lead.name}</div>
                              <div style={{ color: '#64D2FF', fontSize: '13px', marginTop: '2px' }}>
                                {lead.storeName || 'Store not provided'}
                              </div>
                              {lead.websiteUrl && (
                                <a
                                  href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: '#86868B', fontSize: '12px', textDecoration: 'none', display: 'block', marginTop: '2px' }}
                                >
                                  {lead.websiteUrl} ↗
                                </a>
                              )}
                              <div style={{ fontSize: '11px', color: '#555', marginTop: '6px' }}>
                                {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>

                            {/* Contact Channels */}
                            <td style={{ padding: '18px 20px' }}>
                              <a href={`mailto:${lead.email}`} style={{ color: '#0A84FF', textDecoration: 'none', display: 'block', fontWeight: 600 }}>
                                {lead.email}
                              </a>
                              {lead.phone && (
                                <div style={{ color: '#CBD5E0', fontSize: '12.5px', marginTop: '4px' }}>
                                  {lead.phone}
                                </div>
                              )}
                              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                {waRaw && (
                                  <a
                                    href={`https://wa.me/${waRaw}?text=${encodeURIComponent(`Hi ${lead.name}, this is Hassan from ManageMyWeb regarding your 3D demo request!`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      background: 'rgba(37, 211, 102, 0.15)',
                                      color: '#25D366',
                                      padding: '3px 8px',
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      fontWeight: 700,
                                      textDecoration: 'none',
                                    }}
                                  >
                                    WhatsApp 💬
                                  </a>
                                )}
                                <a
                                  href={`mailto:${lead.email}?subject=${encodeURIComponent('ManageMyWeb: Your 3D Virtual Store Prototype Demo')}`}
                                  style={{
                                    background: 'rgba(10, 132, 255, 0.15)',
                                    color: '#0A84FF',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                  }}
                                >
                                  Email ✉️
                                </a>
                              </div>
                            </td>

                            {/* Category & Promo */}
                            <td style={{ padding: '18px 20px' }}>
                              <span
                                style={{
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  color: '#E5E5EA',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  display: 'inline-block',
                                  marginBottom: '6px',
                                }}
                              >
                                {lead.category}
                              </span>
                              <div style={{ fontSize: '11px', color: '#FFB340', fontWeight: 700 }}>
                                Promo: {lead.promoCode || 'FREE-3D-DEMO-60D'}
                              </div>
                              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                                Rev: {lead.revenueRange || 'N/A'}
                              </div>
                            </td>

                            {/* Message / Vision */}
                            <td style={{ padding: '18px 20px', maxWidth: '320px' }}>
                              <div
                                style={{
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  padding: '10px 12px',
                                  borderRadius: '12px',
                                  fontSize: '12.5px',
                                  color: '#CBD5E0',
                                  lineHeight: 1.5,
                                  maxHeight: '120px',
                                  overflowY: 'auto',
                                }}
                              >
                                {lead.message || 'No additional message provided.'}
                              </div>
                            </td>

                            {/* Status */}
                            <td style={{ padding: '18px 20px' }}>
                              <select
                                value={lead.status || 'New'}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                style={{
                                  background:
                                    lead.status === 'New'
                                      ? 'rgba(255, 159, 10, 0.2)'
                                      : lead.status === 'Closed Won'
                                      ? 'rgba(48, 209, 88, 0.2)'
                                      : 'rgba(10, 132, 255, 0.2)',
                                  color:
                                    lead.status === 'New'
                                      ? '#FF9F0A'
                                      : lead.status === 'Closed Won'
                                      ? '#30D158'
                                      : '#64D2FF',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  borderRadius: '980px',
                                  padding: '6px 12px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  outline: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                <option value="New" style={{ background: '#12141F', color: '#fff' }}>New</option>
                                <option value="Contacted" style={{ background: '#12141F', color: '#fff' }}>Contacted</option>
                                <option value="In Progress" style={{ background: '#12141F', color: '#fff' }}>In Progress</option>
                                <option value="Closed Won" style={{ background: '#12141F', color: '#fff' }}>Closed Won</option>
                                <option value="Archived" style={{ background: '#12141F', color: '#fff' }}>Archived</option>
                              </select>
                            </td>

                            {/* Actions & Notes */}
                            <td style={{ padding: '18px 20px' }}>
                              {editingNoteId === lead.id ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <textarea
                                    rows={2}
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    className="ios-input"
                                    style={{ fontSize: '12px', padding: '6px' }}
                                  />
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <button
                                      onClick={() => saveLeadNote(lead.id)}
                                      className="ios-btn-blue"
                                      style={{ padding: '4px 8px', fontSize: '11px' }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingNoteId(null)}
                                      className="ios-btn-secondary"
                                      style={{ padding: '4px 8px', fontSize: '11px' }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div
                                    style={{
                                      fontSize: '12px',
                                      color: lead.notes ? '#CBD5E0' : '#666',
                                      fontStyle: lead.notes ? 'normal' : 'italic',
                                      marginBottom: '6px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      setEditingNoteId(lead.id);
                                      setNoteText(lead.notes || '');
                                    }}
                                  >
                                    {lead.notes || '+ Add private note'}
                                  </div>
                                  <button
                                    onClick={() => deleteLead(lead.id)}
                                    style={{
                                      background: 'transparent',
                                      border: 'none',
                                      color: '#FF453A',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      opacity: 0.7,
                                    }}
                                  >
                                    Delete Lead 🗑️
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
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SMTP EMAIL CONFIGURATION                                */}
        {/* ============================================================== */}
        {activeTab === 'smtp' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            {/* SMTP Settings Form */}
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>⚙️</span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                  SMTP Credentials Setup
                </h3>
              </div>
              <p style={{ color: '#86868B', fontSize: '13.5px', marginBottom: '24px' }}>
                Configure your SMTP server to receive instant email notifications whenever a customer submits an inquiry or claims the 60-day free 3D demo.
              </p>

              {smtpMsg.text && (
                <div
                  style={{
                    background: smtpMsg.type === 'success' ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 69, 58, 0.15)',
                    border: `1px solid ${smtpMsg.type === 'success' ? 'rgba(48, 209, 88, 0.4)' : 'rgba(255, 69, 58, 0.4)'}`,
                    color: smtpMsg.type === 'success' ? '#30D158' : '#FF6B6B',
                    padding: '12px',
                    borderRadius: '12px',
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                      SMTP Host *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="smtp.gmail.com or smtp.sendgrid.net"
                      value={smtpConfig.host || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
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
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                    SMTP Username / Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="concierge@managemyweb.co"
                    value={smtpConfig.user || ''}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                      From Name
                    </label>
                    <input
                      type="text"
                      placeholder="ManageMyWeb Studio"
                      value={smtpConfig.fromName || ''}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, fromName: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                      From Email (Sender)
                    </label>
                    <input
                      type="text"
                      placeholder="hello@managemyweb.co"
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
                    style={{ width: '18px', height: '18px', accentColor: '#0A84FF' }}
                  />
                  <label htmlFor="smtpSecure" style={{ fontSize: '13px', color: '#CBD5E0', cursor: 'pointer' }}>
                    Use SSL / TLS (Required for port 465)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={smtpLoading}
                  className="ios-btn-blue"
                  style={{ marginTop: '10px', padding: '13px' }}
                >
                  {smtpLoading ? 'Saving Settings...' : 'Save SMTP Configuration ✓'}
                </button>
              </form>
            </div>

            {/* Test Email Diagnostic Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🧪</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                    Send Diagnostic Test Email
                  </h3>
                </div>
                <p style={{ color: '#86868B', fontSize: '13.5px', marginBottom: '20px' }}>
                  Verify your SMTP connection in real time by dispatching a test email to your inbox.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                    Recipient Test Address
                  </label>
                  <input
                    type="email"
                    placeholder="your-personal@email.com"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="ios-input"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTestSmtp}
                  disabled={testingSmtp || !testEmail}
                  className="ios-btn-primary"
                  style={{ width: '100%', padding: '13px' }}
                >
                  {testingSmtp ? 'Verifying SMTP Connection...' : 'Send Live Test Email 🚀'}
                </button>

                {testResult && (
                  <div
                    style={{
                      marginTop: '20px',
                      background: testResult.success ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 69, 58, 0.15)',
                      border: `1px solid ${testResult.success ? 'rgba(48, 209, 88, 0.4)' : 'rgba(255, 69, 58, 0.4)'}`,
                      color: testResult.success ? '#30D158' : '#FF6B6B',
                      padding: '14px',
                      borderRadius: '14px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>{testResult.success ? '✅ Success:' : '❌ Error:'}</strong> {testResult.message}
                  </div>
                )}
              </div>

              {/* Provider Quick Setup Hints */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#64D2FF', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Common SMTP Hostnames:
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '12.5px', color: '#CBD5E0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>• <strong>Gmail / Google Workspace:</strong> <span style={{ fontFamily: 'monospace' }}>smtp.gmail.com</span> (Port 587, use Google App Password)</li>
                  <li>• <strong>SendGrid:</strong> <span style={{ fontFamily: 'monospace' }}>smtp.sendgrid.net</span> (Port 587, user: apikey)</li>
                  <li>• <strong>Mailgun:</strong> <span style={{ fontFamily: 'monospace' }}>smtp.mailgun.org</span> (Port 587)</li>
                  <li>• <strong>Hostinger / cPanel:</strong> <span style={{ fontFamily: 'monospace' }}>smtp.hostinger.com</span> (Port 465 SSL)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: 60-DAY DEADLINE & CAMPAIGN CONTROLS                     */}
        {/* ============================================================== */}
        {activeTab === 'campaign' && settings && (
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '32px', maxWidth: '800px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              60-Day Promotional Campaign Controls
            </h3>
            <p style={{ color: '#86868B', fontSize: '14px', marginBottom: '28px' }}>
              Manage the 2-month deadline banner, remaining prototype demo spots, and promotional copy across the entire website.
            </p>

            {settingsMsg && (
              <div
                style={{
                  background: 'rgba(48, 209, 88, 0.15)',
                  border: '1px solid rgba(48, 209, 88, 0.4)',
                  color: '#30D158',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}
              >
                {settingsMsg}
              </div>
            )}

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                  Campaign Title
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
                <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                  Campaign Description
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
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
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                    Demo Spots Remaining Counter
                  </label>
                  <input
                    type="number"
                    value={settings.promo?.slotsRemaining || 3}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                    WhatsApp Raw Number (digits only)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappRaw || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappRaw: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', color: '#CBD5E0', marginBottom: '6px', fontWeight: 600 }}>
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail || ''}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="ios-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={settingsLoading}
                className="ios-btn-blue"
                style={{ padding: '14px', marginTop: '10px' }}
              >
                {settingsLoading ? 'Saving Campaign...' : 'Update Promotional Campaign ✓'}
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: STUDIO METRICS & HEALTH                                 */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              {[
                { label: 'Total Inquiries', value: leads.length, icon: '📬', color: '#0A84FF' },
                {
                  label: 'Free 3D Demos Claimed',
                  value: leads.filter((l) => l.promoCode?.includes('FREE')).length,
                  icon: '🎁',
                  color: '#30D158',
                },
                {
                  label: 'SMTP Operational Status',
                  value: smtpConfig.isConfigured ? 'Connected' : 'Action Required',
                  icon: '✉️',
                  color: smtpConfig.isConfigured ? '#30D158' : '#FF9F0A',
                },
                {
                  label: 'Avg Response Time',
                  value: '< 45 min',
                  icon: '⚡',
                  color: '#64D2FF',
                },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#86868B', fontWeight: 600 }}>{stat.label}</span>
                    <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ padding: '36px', borderRadius: '28px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                Next-Gen Spatial Web Architecture
              </h3>
              <p style={{ color: '#CBD5E0', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
                ManageMyWeb is engineered using Next.js, Three.js WebGL rendering, and responsive glassmorphism designed to feel native on Apple Vision Pro and iOS devices.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <span className="ios-badge ios-badge-emerald">✓ Three.js 60 FPS GPU Acceleration</span>
                <span className="ios-badge ios-badge-glow">✓ Next.js SSR SEO Indexing</span>
                <span className="ios-badge ios-badge-amber">✓ Persistent Local Storage & SMTP Dispatch</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
