import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const DEFAULT_CONFIRMATION_SUBJECT = 'Step 1: Your 3D store demo for {{storeName}}';
const DEFAULT_CONFIRMATION_BODY = [
  'Hi {{firstName}},',
  '',
  'Thanks for reaching out to ManageMyWeb. I received your request for Step 1: your complimentary 3D storefront demo for {{storeName}}.',
  '',
  'Here is how our 2-step process works:',
  '1. Free 3D Demo (In Progress): Our team is building an interactive 3D preview featuring your products and will send your private walkthrough link within 48 hours.',
  '2. Custom Quotation: Once you explore the 3D demo with your team and share any adjustments, we will prepare a custom quotation tailored to your exact catalog scope.',
  '',
  'Quick question while we set this up: are there 2 or 3 best-selling products on your site you’d especially like us to feature on the main display?',
  '',
  'You can reply directly to this email, or message me on WhatsApp (+92 317 4075023) anytime.',
  '',
  'Best regards,',
  'ManageMyWeb',
  'sales@managemyweb.co · +92 317 4075023',
].join('\n');

const DEFAULT_QUOTATION_SUBJECT = 'Your custom quotation request for {{storeName}}';
const DEFAULT_QUOTATION_BODY = [
  'Hi {{firstName}},',
  '',
  'Thanks for contacting ManageMyWeb. I received your request for a custom quotation for {{storeName}} ({{packageScope}}).',
  '',
  'Our engineering team is reviewing your store requirements right now and putting together an itemized proposal with scope, timeline, and investment options. I will send your custom quotation over within 24 hours.',
  '',
  'Also, if you would like us to include a complimentary 3D preview of 2 or 3 of your products alongside your quotation, just reply with the product links or message me on WhatsApp (+92 317 4075023).',
  '',
  'Best regards,',
  'ManageMyWeb',
  'sales@managemyweb.co · +92 317 4075023',
].join('\n');

const PRE_DESIGNED_QUOTE_TEMPLATES = {
  launchpad: {
    packageTitle: '3D Storefront Launchpad',
    timeline: '10 Business Days',
    items: [
      {
        title: '3D Storefront Launchpad Architecture (WebGL / 60fps)',
        description: 'Custom 3D showroom with interactive product shelving, express bar checkout, and provenance wall.',
        qty: 1,
        price: 1850,
      },
      {
        title: '3D Product Modeling & Mobile Optimization (Up to 15 SKUs)',
        description: 'High-resolution WebGL models optimized for iOS Safari, Android Chrome, and desktop.',
        qty: 1,
        price: 450,
      },
      {
        title: 'Live Shopify / WooCommerce Catalog & Checkout Sync',
        description: 'Direct inventory, variant, and express checkout integration.',
        qty: 1,
        price: 300,
      },
    ],
    discount: 250,
    notes: 'Includes complimentary 3D prototype preview and 30 days of post-launch technical support.',
  },
  flagship: {
    packageTitle: 'Spatial Retail Flagship',
    timeline: '14 Business Days',
    items: [
      {
        title: 'Bespoke Multi-Zone 3D Architectural Showroom',
        description: 'Custom 360° flagship retail space with gallery lighting, acoustic soundscape, and macro product inspection.',
        qty: 1,
        price: 2900,
      },
      {
        title: 'Interactive Product Shelving & Apple Pay Express Register',
        description: 'Unlimited 3D shelving zones synced with Shopify, WooCommerce, or headless backend.',
        qty: 1,
        price: 650,
      },
      {
        title: 'Spatial Customer Engagement Analytics & Speed Tuning',
        description: 'Zone interaction tracking, Core Web Vitals optimization, and global edge delivery.',
        qty: 1,
        price: 350,
      },
    ],
    discount: 400,
    notes: 'Includes complimentary 3D demo prototype, custom lighting modes, and dedicated lead engineer.',
  },
  concierge: {
    packageTitle: 'Managed Web Concierge Retainer',
    timeline: 'Immediate Onboarding',
    items: [
      {
        title: 'Global Edge Cloud NVMe Hosting & Technical Stewardship',
        description: '24/7 managed hosting, domain/DNS management, SSL, and DMARC/SPF email authentication.',
        qty: 1,
        price: 490,
      },
      {
        title: 'Continuous Core Web Vitals & Unlimited Routine Store Edits',
        description: 'Ongoing speed tuning, daily off-site backups, and same-day catalog/content updates.',
        qty: 1,
        price: 0,
      },
    ],
    discount: 0,
    notes: 'Monthly managed operations retainer with direct WhatsApp access to your engineering team.',
  },
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'quotations' | 'smtp' | 'cookies' | 'campaign' | 'overview'

  // Leads State
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Quotations State
  const [quotations, setQuotations] = useState([]);
  const [quoteStats, setQuoteStats] = useState({
    totalQuotations: 0,
    totalQuotedAmount: 0,
    acceptedCount: 0,
    acceptedAmount: 0,
    sentCount: 0,
  });
  const [activeQuote, setActiveQuote] = useState({
    id: '',
    quoteNumber: 'QT-2026-103',
    leadId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    storeName: '',
    websiteUrl: '',
    journeyType: 'Demo → Step 2 Quotation',
    packageTitle: 'Spatial Retail Flagship',
    currency: '$',
    validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    timeline: '14 Business Days',
    paymentTerms: '50% Kickoff Deposit · 50% Upon Storefront Launch',
    items: PRE_DESIGNED_QUOTE_TEMPLATES.flagship.items,
    discount: 400,
    taxRate: 0,
    status: 'Draft',
    notes: PRE_DESIGNED_QUOTE_TEMPLATES.flagship.notes,
  });
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteMsg, setQuoteMsg] = useState({ type: '', text: '' });

  // SMTP State
  const [smtpConfig, setSmtpConfig] = useState({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    user: 'sales@managemyweb.co',
    pass: '',
    fromEmail: 'sales@managemyweb.co',
    fromName: 'ManageMyWeb',
    notifyEmail: 'sales@managemyweb.co',
    confirmationSubject: DEFAULT_CONFIRMATION_SUBJECT,
    confirmationBody: DEFAULT_CONFIRMATION_BODY,
    quotationSubject: DEFAULT_QUOTATION_SUBJECT,
    quotationBody: DEFAULT_QUOTATION_BODY,
    isConfigured: true,
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

  // Cookie Consent & Traffic Analytics State
  const [cookieStore, setCookieStore] = useState({
    config: {
      enabled: true,
      bannerTitle: 'Cookie & Privacy Preferences',
      bannerText:
        'We use cookies to deliver smooth 3D WebGL storefront previews, measure site performance, and improve your browsing experience. You can accept all cookies or customize your preferences at any time.',
      privacyPolicyUrl: '/privacy',
      defaultAnalytics: true,
      defaultMarketing: true,
      defaultFunctional: true,
    },
    stats: {
      totalDecisions: 0,
      acceptedAll: 0,
      essentialOnly: 0,
      customized: 0,
      analyticsOptIn: 0,
      marketingOptIn: 0,
      functionalOptIn: 0,
      totalPageViews: 0,
      pageViewsByPath: {},
    },
    recentConsents: [],
  });
  const [cookieLoading, setCookieLoading] = useState(false);
  const [cookieMsg, setCookieMsg] = useState('');

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
    fetchQuotations();
    fetchSmtp();
    fetchSettings();
    fetchCookies();
  };

  const fetchQuotations = async () => {
    try {
      const res = await fetch('/api/admin/quotations');
      const data = await res.json();
      if (res.ok && data) {
        setQuotations(data.quotations || []);
        if (data.stats) setQuoteStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const applyQuoteTemplate = (templateKey) => {
    const tpl = PRE_DESIGNED_QUOTE_TEMPLATES[templateKey];
    if (!tpl) return;
    setActiveQuote((prev) => ({
      ...prev,
      packageTitle: tpl.packageTitle,
      timeline: tpl.timeline,
      items: tpl.items.map((item) => ({ ...item })),
      discount: tpl.discount,
      notes: tpl.notes,
    }));
  };

  const loadLeadIntoQuotation = (lead) => {
    if (!lead) return;
    const isDirectQuote = lead.requestType === 'quotation';
    const nextQuoteNumber = `QT-${new Date().getFullYear()}-${String(quotations.length + 101).padStart(3, '0')}`;
    const pkgLower = (lead.requestedPackage || '').toLowerCase();
    const tplKey = pkgLower.includes('launchpad')
      ? 'launchpad'
      : pkgLower.includes('managed') && !pkgLower.includes('3d')
        ? 'concierge'
        : 'flagship';
    const tpl = PRE_DESIGNED_QUOTE_TEMPLATES[tplKey];

    setActiveQuote({
      id: '',
      quoteNumber: nextQuoteNumber,
      leadId: lead.id,
      clientName: lead.name || '',
      clientEmail: lead.email || '',
      clientPhone: lead.phone || '',
      storeName: lead.storeName || '',
      websiteUrl: lead.websiteUrl || '',
      journeyType: isDirectQuote ? 'Direct Quotation Request' : 'Demo → Step 2 Quotation',
      packageTitle: lead.requestedPackage || tpl.packageTitle,
      currency: '$',
      validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      timeline: tpl.timeline,
      paymentTerms: '50% Kickoff Deposit · 50% Upon Storefront Launch',
      items: tpl.items.map((i) => ({ ...i })),
      discount: tpl.discount,
      taxRate: 0,
      status: 'Draft',
      notes: tpl.notes,
    });
    setQuoteMsg({ type: '', text: '' });
    setActiveTab('quotations');
  };

  const handleSaveQuotation = async (sendEmail = false) => {
    if (!activeQuote.clientName || !activeQuote.clientEmail) {
      setQuoteMsg({ type: 'error', text: 'Please enter Client Name and Client Email.' });
      return;
    }
    setQuoteLoading(true);
    setQuoteMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...activeQuote,
          sendEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchQuotations();
        fetchLeads();
        setActiveQuote((prev) => ({ ...prev, id: data.quotation.id, status: data.quotation.status }));
        if (sendEmail) {
          if (data.emailDispatched) {
            setQuoteMsg({
              type: 'success',
              text: `Quotation ${data.quotation.quoteNumber} saved and emailed to ${activeQuote.clientEmail}.`,
            });
          } else {
            setQuoteMsg({
              type: 'error',
              text: `Quotation saved, but email could not be sent: ${data.emailError || 'Check SMTP password'}.`,
            });
          }
        } else {
          setQuoteMsg({
            type: 'success',
            text: `Quotation ${data.quotation.quoteNumber} saved (${data.quotation.currency}${data.quotation.totalAmount.toLocaleString()}).`,
          });
        }
      } else {
        setQuoteMsg({ type: 'error', text: data.error || 'Failed to save quotation.' });
      }
    } catch (e) {
      setQuoteMsg({ type: 'error', text: 'Network error while saving quotation.' });
    } finally {
      setQuoteLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchQuotations();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteQuotation = async (id) => {
    if (!confirm('Delete this quotation?')) return;
    try {
      const res = await fetch(`/api/admin/quotations?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchQuotations();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCookies = async () => {
    try {
      const res = await fetch('/api/cookies');
      const data = await res.json();
      if (res.ok && data) setCookieStore(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCookieConfig = async (e) => {
    e.preventDefault();
    setCookieLoading(true);
    setCookieMsg('');
    try {
      const res = await fetch('/api/cookies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: cookieStore.config }),
      });
      const data = await res.json();
      if (res.ok && data.store) {
        setCookieStore(data.store);
        setCookieMsg('Cookie banner configuration saved.');
      } else {
        setCookieMsg(data.error || 'Failed to save cookie settings.');
      }
    } catch (e) {
      setCookieMsg('Network error saving cookie settings.');
    } finally {
      setCookieLoading(false);
    }
  };

  const handleResetCookieStats = async () => {
    if (!confirm('Reset all visitor cookie consent statistics and logs?')) return;
    try {
      const res = await fetch('/api/cookies', { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.store) {
        setCookieStore(data.store);
        setCookieMsg('Cookie statistics reset.');
      }
    } catch (e) {
      console.error(e);
    }
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
    if (e && e.preventDefault) e.preventDefault();
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
        if (data.settings) setSettings(data.settings);
        setSettingsMsg('Configuration saved and live across the website.');
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
              sub: 'Demo + Quotation inquiries',
            },
            {
              label: 'People Quoted',
              value: quoteStats.totalQuotations || quotations.length,
              sub: `${quoteStats.sentCount || 0} sent · ${quoteStats.acceptedCount || 0} accepted`,
            },
            {
              label: 'Total Quoted Pipeline',
              value: `$${(quoteStats.totalQuotedAmount || 0).toLocaleString()}`,
              sub: `$${(quoteStats.acceptedAmount || 0).toLocaleString()} approved / won`,
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
              { id: 'quotations', label: `Quotations & Proposals (${quotations.length})` },
              { id: 'cookies', label: `Google Analytics, Search Console & Cookies` },
              { id: 'smtp', label: 'SMTP & Confirmation Emails' },
              { id: 'campaign', label: 'Site Config & Contact Info' },
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

                          {/* Category & Visitor Flow */}
                          <td style={{ padding: '18px 20px' }}>
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '3px 9px',
                                borderRadius: '980px',
                                fontSize: '11px',
                                fontWeight: 600,
                                marginBottom: '6px',
                                background: lead.requestType === 'quotation' ? '#FFF4E5' : '#EBF5FF',
                                color: lead.requestType === 'quotation' ? '#B25000' : '#0066CC',
                              }}
                            >
                              {lead.journeyStage ||
                                (lead.requestType === 'quotation'
                                  ? 'Direct Quotation Requested'
                                  : 'Step 1: Free Demo → Step 2: Quote')}
                            </div>
                            <br />
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
                            {lead.requestedPackage && (
                              <div style={{ fontSize: '11.5px', color: '#1D1D1F', fontWeight: 500 }}>
                                Scope: {lead.requestedPackage}
                              </div>
                            )}
                            {lead.productCount && (
                              <div style={{ fontSize: '11.5px', color: '#86868B', marginTop: '2px' }}>
                                {lead.productCount} · {lead.platform || 'Shopify'}
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
                                <button
                                  type="button"
                                  onClick={() => loadLeadIntoQuotation(lead)}
                                  className="btn-apple-blue"
                                  style={{
                                    padding: '6px 12px',
                                    fontSize: '11.5px',
                                    marginBottom: '8px',
                                    width: '100%',
                                  }}
                                >
                                  {lead.quoteNumber ? `Edit Quote (${lead.quoteNumber})` : '+ Prepare Quotation'}
                                </button>
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
        {/* TAB 2: QUOTATIONS & PRE-DESIGNED PROPOSAL STUDIO               */}
        {/* ============================================================== */}
        {activeTab === 'quotations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Quotation Analytics Summary Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                {
                  label: 'Total People Quoted',
                  value: quoteStats.totalQuotations || quotations.length,
                  sub: `${quoteStats.sentCount || 0} emailed to clients`,
                },
                {
                  label: 'Total Quoted Amount',
                  value: `$${(quoteStats.totalQuotedAmount || 0).toLocaleString()}`,
                  sub: 'Combined value of all quotations',
                },
                {
                  label: 'Approved / Won Quotations',
                  value: `$${(quoteStats.acceptedAmount || 0).toLocaleString()}`,
                  sub: `${quoteStats.acceptedCount || 0} accepted proposals`,
                },
                {
                  label: 'Step 1 Demo Leads Ready for Quote',
                  value: leads.filter((l) => l.requestType !== 'quotation').length,
                  sub: 'Select any lead below to generate Step 2 quote',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D2D2D7',
                    borderRadius: '18px',
                    padding: '22px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#6E6E73', marginBottom: '6px' }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#86868B' }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Pre-Designed Adjustable Quotation Builder + Live Formal Quotation Preview */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '24px',
                alignItems: 'start',
              }}
            >
              {/* LEFT: Adjustable Quotation Editor */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '22px',
                  padding: '32px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    Pre-Designed Quotation Builder &amp; Adjustments
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.5 }}>
                    Choose a pre-designed package template or select a client lead, adjust deliverables and prices, and send the formal quotation directly via email or WhatsApp.
                  </p>
                </div>

                {/* 1-Click Pre-Designed Package Presets */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Load Pre-Designed Quotation Template
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => applyQuoteTemplate('launchpad')}
                      className="btn-apple-secondary"
                      style={{ padding: '7px 13px', fontSize: '12px' }}
                    >
                      3D Launchpad ($2,350)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyQuoteTemplate('flagship')}
                      className="btn-apple-secondary"
                      style={{ padding: '7px 13px', fontSize: '12px' }}
                    >
                      Spatial Flagship ($3,500)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyQuoteTemplate('concierge')}
                      className="btn-apple-secondary"
                      style={{ padding: '7px 13px', fontSize: '12px' }}
                    >
                      Managed Concierge ($490/mo)
                    </button>
                  </div>
                </div>

                {/* Auto-Fill from Existing Client Lead */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#1D1D1F', marginBottom: '6px' }}>
                    Auto-Fill Client from Leads (Demo Step 2 or Direct Quote Request)
                  </label>
                  <select
                    onChange={(e) => {
                      const found = leads.find((l) => l.id === e.target.value);
                      if (found) loadLeadIntoQuotation(found);
                    }}
                    value={activeQuote.leadId || ''}
                    className="ios-input"
                  >
                    <option value="">— Select a client lead or type manually below —</option>
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} · {l.storeName || l.email} ({l.requestType === 'quotation' ? 'Direct Quote' : 'Demo Step 1'})
                      </option>
                    ))}
                  </select>
                </div>

                {quoteMsg.text && (
                  <div
                    style={{
                      background: quoteMsg.type === 'success' ? '#E8F5E9' : '#FFF2F2',
                      border: `1px solid ${quoteMsg.type === 'success' ? '#B7E1CD' : '#FFD6D6'}`,
                      color: quoteMsg.type === 'success' ? '#1D7D3F' : '#D70015',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    {quoteMsg.text}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 90px', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Quote Number
                      </label>
                      <input
                        type="text"
                        value={activeQuote.quoteNumber}
                        onChange={(e) => setActiveQuote({ ...activeQuote, quoteNumber: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Journey Stage
                      </label>
                      <select
                        value={activeQuote.journeyType}
                        onChange={(e) => setActiveQuote({ ...activeQuote, journeyType: e.target.value })}
                        className="ios-input"
                      >
                        <option value="Demo → Step 2 Quotation">Demo → Step 2 Quotation</option>
                        <option value="Direct Quotation Request">Direct Quotation Request</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Currency
                      </label>
                      <select
                        value={activeQuote.currency}
                        onChange={(e) => setActiveQuote({ ...activeQuote, currency: e.target.value })}
                        className="ios-input"
                      >
                        <option value="$">USD ($)</option>
                        <option value="€">EUR (€)</option>
                        <option value="£">GBP (£)</option>
                        <option value="AED ">AED</option>
                        <option value="PKR ">PKR</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Client Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Elena Rostova"
                        value={activeQuote.clientName}
                        onChange={(e) => setActiveQuote({ ...activeQuote, clientName: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Client Email *
                      </label>
                      <input
                        type="email"
                        placeholder="elena@brand.com"
                        value={activeQuote.clientEmail}
                        onChange={(e) => setActiveQuote({ ...activeQuote, clientEmail: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Brand / Store Name
                      </label>
                      <input
                        type="text"
                        placeholder="Atelier Horology"
                        value={activeQuote.storeName}
                        onChange={(e) => setActiveQuote({ ...activeQuote, storeName: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Proposal Title / Scope
                      </label>
                      <input
                        type="text"
                        placeholder="Spatial Retail Flagship"
                        value={activeQuote.packageTitle}
                        onChange={(e) => setActiveQuote({ ...activeQuote, packageTitle: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Delivery Timeline
                      </label>
                      <input
                        type="text"
                        value={activeQuote.timeline}
                        onChange={(e) => setActiveQuote({ ...activeQuote, timeline: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Valid Until
                      </label>
                      <input
                        type="date"
                        value={activeQuote.validUntil}
                        onChange={(e) => setActiveQuote({ ...activeQuote, validUntil: e.target.value })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  {/* Line Items Editor */}
                  <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '14px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#1D1D1F', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Deliverable Line Items (Adjustable)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveQuote({
                            ...activeQuote,
                            items: [
                              ...(activeQuote.items || []),
                              { title: 'Custom 3D Feature / Integration', description: 'Tailored engineering deliverable.', qty: 1, price: 450 },
                            ],
                          })
                        }
                        className="btn-apple-secondary"
                        style={{ padding: '4px 10px', fontSize: '11.5px' }}
                      >
                        + Add Line Item
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(activeQuote.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#F5F5F7',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid #E5E5EA',
                          }}
                        >
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 65px 100px 28px', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                            <input
                              type="text"
                              placeholder="Deliverable title"
                              value={item.title}
                              onChange={(e) => {
                                const updated = [...activeQuote.items];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setActiveQuote({ ...activeQuote, items: updated });
                              }}
                              className="ios-input"
                              style={{ padding: '7px 10px', fontSize: '12.5px', fontWeight: 600 }}
                            />
                            <input
                              type="number"
                              min="1"
                              placeholder="Qty"
                              value={item.qty}
                              onChange={(e) => {
                                const updated = [...activeQuote.items];
                                updated[idx] = { ...updated[idx], qty: Number(e.target.value) };
                                setActiveQuote({ ...activeQuote, items: updated });
                              }}
                              className="ios-input"
                              style={{ padding: '7px 8px', fontSize: '12.5px' }}
                            />
                            <input
                              type="number"
                              placeholder="Price"
                              value={item.price}
                              onChange={(e) => {
                                const updated = [...activeQuote.items];
                                updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                                setActiveQuote({ ...activeQuote, items: updated });
                              }}
                              className="ios-input"
                              style={{ padding: '7px 8px', fontSize: '12.5px', fontWeight: 600 }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = activeQuote.items.filter((_, i) => i !== idx);
                                setActiveQuote({ ...activeQuote, items: updated });
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#D70015',
                                cursor: 'pointer',
                                fontSize: '14px',
                              }}
                              title="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Description of deliverable"
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...activeQuote.items];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setActiveQuote({ ...activeQuote, items: updated });
                            }}
                            className="ios-input"
                            style={{ padding: '6px 10px', fontSize: '12px', color: '#424245' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discount, Tax & Payment Terms */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Discount Amount ({activeQuote.currency})
                      </label>
                      <input
                        type="number"
                        value={activeQuote.discount}
                        onChange={(e) => setActiveQuote({ ...activeQuote, discount: Number(e.target.value) })}
                        className="ios-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                        Tax (%)
                      </label>
                      <input
                        type="number"
                        value={activeQuote.taxRate}
                        onChange={(e) => setActiveQuote({ ...activeQuote, taxRate: Number(e.target.value) })}
                        className="ios-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '4px', fontWeight: 500 }}>
                      Notes &amp; Included Terms
                    </label>
                    <textarea
                      rows={2}
                      value={activeQuote.notes}
                      onChange={(e) => setActiveQuote({ ...activeQuote, notes: e.target.value })}
                      className="ios-input"
                      style={{ fontSize: '12.5px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '8px' }}>
                    <button
                      type="button"
                      disabled={quoteLoading}
                      onClick={() => handleSaveQuotation(true)}
                      className="btn-apple-blue"
                      style={{ padding: '11px 20px', fontSize: '13.5px' }}
                    >
                      {quoteLoading ? 'Processing...' : 'Save & Email Quotation to Client'}
                    </button>
                    <button
                      type="button"
                      disabled={quoteLoading}
                      onClick={() => handleSaveQuotation(false)}
                      className="btn-apple-dark"
                      style={{ padding: '11px 18px', fontSize: '13.5px' }}
                    >
                      Save Quotation Only
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Live Pre-Designed Quotation Preview Card */}
              {(() => {
                const liveSubtotal = (activeQuote.items || []).reduce(
                  (sum, i) => sum + (Number(i.qty) || 1) * (Number(i.price) || 0),
                  0
                );
                const liveAfterDisc = Math.max(0, liveSubtotal - (Number(activeQuote.discount) || 0));
                const liveTax = Math.round(liveAfterDisc * ((Number(activeQuote.taxRate) || 0) / 100));
                const liveTotal = liveAfterDisc + liveTax;
                const cur = activeQuote.currency || '$';

                return (
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #D2D2D7',
                      borderRadius: '22px',
                      overflow: 'hidden',
                      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div
                      style={{
                        background: '#F5F5F7',
                        padding: '24px 28px',
                        borderBottom: '1px solid #D2D2D7',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0066CC', marginBottom: '4px' }}>
                          Live Pre-Designed Quotation Preview
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F' }}>ManageMyWeb</div>
                        <div style={{ fontSize: '12px', color: '#6E6E73' }}>
                          3D Virtual Storefronts &amp; Managed Web Operations
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F' }}>{activeQuote.quoteNumber}</div>
                        <div style={{ fontSize: '11.5px', color: '#6E6E73' }}>Valid: {activeQuote.validUntil}</div>
                        <div style={{ fontSize: '11.5px', color: '#0066CC', fontWeight: 500, marginTop: '2px' }}>
                          {activeQuote.journeyType}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '28px' }}>
                      <div
                        style={{
                          background: '#F5F5F7',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          marginBottom: '20px',
                          fontSize: '13px',
                          color: '#424245',
                          lineHeight: 1.5,
                        }}
                      >
                        <strong style={{ color: '#1D1D1F' }}>Prepared For:</strong>{' '}
                        {activeQuote.clientName || 'Client Name'} ({activeQuote.storeName || 'Brand Storefront'})<br />
                        <strong style={{ color: '#1D1D1F' }}>Scope:</strong> {activeQuote.packageTitle} ·{' '}
                        <strong style={{ color: '#1D1D1F' }}>Timeline:</strong> {activeQuote.timeline}
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #D2D2D7', color: '#6E6E73', fontSize: '11px', textTransform: 'uppercase' }}>
                            <th style={{ padding: '8px 0', textAlign: 'left' }}>Deliverable</th>
                            <th style={{ padding: '8px 6px', textAlign: 'center' }}>Qty</th>
                            <th style={{ padding: '8px 0', textAlign: 'right' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(activeQuote.items || []).map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #E5E5EA' }}>
                              <td style={{ padding: '12px 0' }}>
                                <div style={{ fontWeight: 600, color: '#1D1D1F' }}>{item.title}</div>
                                {item.description && (
                                  <div style={{ fontSize: '12px', color: '#6E6E73', marginTop: '2px' }}>{item.description}</div>
                                )}
                              </td>
                              <td style={{ padding: '12px 6px', textAlign: 'center', color: '#424245' }}>{item.qty || 1}</td>
                              <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600, color: '#1D1D1F', whiteSpace: 'nowrap' }}>
                                {cur}
                                {((Number(item.qty) || 1) * (Number(item.price) || 0)).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div style={{ background: '#F5F5F7', borderRadius: '14px', padding: '16px 18px', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6E6E73', marginBottom: '6px' }}>
                          <span>Subtotal</span>
                          <span style={{ color: '#1D1D1F', fontWeight: 500 }}>
                            {cur}
                            {liveSubtotal.toLocaleString()}
                          </span>
                        </div>
                        {Number(activeQuote.discount) > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1D7D3F', marginBottom: '6px' }}>
                            <span>Onboarding Discount</span>
                            <span style={{ fontWeight: 500 }}>
                              -{cur}
                              {Number(activeQuote.discount).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {Number(activeQuote.taxRate) > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6E6E73', marginBottom: '6px' }}>
                            <span>Tax ({activeQuote.taxRate}%)</span>
                            <span style={{ color: '#1D1D1F' }}>
                              {cur}
                              {liveTax.toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            borderTop: '1px solid #D2D2D7',
                            paddingTop: '10px',
                            marginTop: '6px',
                          }}
                        >
                          <span style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F' }}>Total Quotation Amount</span>
                          <span style={{ fontSize: '24px', fontWeight: 600, color: '#0066CC' }}>
                            {cur}
                            {liveTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {activeQuote.notes && (
                        <div style={{ fontSize: '12.5px', color: '#424245', lineHeight: 1.5, marginBottom: '16px' }}>
                          <strong style={{ color: '#1D1D1F' }}>Included Notes:</strong> {activeQuote.notes}
                        </div>
                      )}

                      <div style={{ fontSize: '12px', color: '#6E6E73', borderTop: '1px solid #E5E5EA', paddingTop: '12px' }}>
                        <strong style={{ color: '#1D1D1F' }}>ManageMyWeb Studio</strong> · sales@managemyweb.co · WhatsApp: +92 317 4075023
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* All Quotations Registry Table */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '22px 26px', borderBottom: '1px solid #E5E5EA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '2px' }}>
                    All Client Quotations ({quotations.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6E6E73' }}>
                    Click &ldquo;Adjust / Load&rdquo; on any quotation to modify line items or resend the proposal email.
                  </p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: '#F5F5F7', borderBottom: '1px solid #D2D2D7', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 20px' }}>Quote #</th>
                      <th style={{ padding: '12px 20px' }}>Client &amp; Store</th>
                      <th style={{ padding: '12px 20px' }}>Journey Flow</th>
                      <th style={{ padding: '12px 20px' }}>Package Scope</th>
                      <th style={{ padding: '12px 20px' }}>Total Amount</th>
                      <th style={{ padding: '12px 20px' }}>Status</th>
                      <th style={{ padding: '12px 20px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotations.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#6E6E73' }}>
                          No quotations created yet. Use the builder above to create your first quotation.
                        </td>
                      </tr>
                    ) : (
                      quotations.map((q) => (
                        <tr key={q.id} style={{ borderBottom: '1px solid #E5E5EA' }}>
                          <td style={{ padding: '16px 20px', fontWeight: 600, fontFamily: 'monospace', color: '#1D1D1F' }}>
                            {q.quoteNumber}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: 600, color: '#1D1D1F' }}>{q.clientName}</div>
                            <div style={{ fontSize: '12.5px', color: '#0066CC' }}>{q.storeName}</div>
                            <div style={{ fontSize: '12px', color: '#6E6E73' }}>{q.clientEmail}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '980px',
                                fontSize: '11.5px',
                                fontWeight: 600,
                                background: q.journeyType?.includes('Direct') ? '#FFF4E5' : '#EBF5FF',
                                color: q.journeyType?.includes('Direct') ? '#B25000' : '#0066CC',
                              }}
                            >
                              {q.journeyType || 'Demo → Step 2 Quotation'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', color: '#424245' }}>{q.packageTitle}</td>
                          <td style={{ padding: '16px 20px', fontSize: '16px', fontWeight: 600, color: '#1D1D1F' }}>
                            {q.currency || '$'}
                            {Number(q.totalAmount || 0).toLocaleString()}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <select
                              value={q.status || 'Draft'}
                              onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                              className="ios-input"
                              style={{ padding: '6px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '980px', width: 'auto' }}
                            >
                              <option value="Draft">Draft</option>
                              <option value="Sent">Sent</option>
                              <option value="Accepted">Accepted / Won</option>
                              <option value="Declined">Declined</option>
                            </select>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveQuote({ ...q });
                                  window.scrollTo({ top: 180, behavior: 'smooth' });
                                }}
                                className="btn-apple-secondary"
                                style={{ padding: '6px 12px', fontSize: '12px' }}
                              >
                                Adjust / Load
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteQuotation(q.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#D70015',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setSmtpConfig({
                      ...smtpConfig,
                      host: 'smtp.zoho.com',
                      port: 465,
                      secure: true,
                      user: 'sales@managemyweb.co',
                      fromEmail: 'sales@managemyweb.co',
                      fromName: 'ManageMyWeb',
                    })
                  }
                  className="btn-apple-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Apply Zoho SSL (465)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSmtpConfig({
                      ...smtpConfig,
                      host: 'smtp.zoho.com',
                      port: 587,
                      secure: false,
                      user: 'sales@managemyweb.co',
                      fromEmail: 'sales@managemyweb.co',
                      fromName: 'ManageMyWeb',
                    })
                  }
                  className="btn-apple-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Apply Zoho TLS (587)
                </button>
              </div>

              <form onSubmit={handleSaveSmtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      SMTP Host *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="smtp.zoho.com"
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
                      placeholder="465"
                      value={smtpConfig.port || 465}
                      onChange={(e) => {
                        const newPort = Number(e.target.value);
                        setSmtpConfig({
                          ...smtpConfig,
                          port: newPort,
                          secure: newPort === 465,
                        });
                      }}
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
                      placeholder="ManageMyWeb"
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

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Receive Lead Notifications At (Your Sales Email) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sales@managemyweb.co"
                    value={smtpConfig.notifyEmail || smtpConfig.fromEmail || ''}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, notifyEmail: e.target.value })}
                    className="ios-input"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="smtpSecure"
                    checked={Number(smtpConfig.port) === 465 || smtpConfig.secure === true}
                    onChange={(e) => {
                      const useSsl = e.target.checked;
                      setSmtpConfig({
                        ...smtpConfig,
                        secure: useSsl,
                        port: useSsl ? 465 : 587,
                      });
                    }}
                    style={{ width: '16px', height: '16px', accentColor: '#0071E3' }}
                  />
                  <label htmlFor="smtpSecure" style={{ fontSize: '13px', color: '#424245', cursor: 'pointer' }}>
                    Use Implicit SSL (Port 465 — uncheck for Port 587 STARTTLS)
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
                  Zoho Mail Configuration Checklist
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '13px', color: '#424245', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>1. Outgoing Server (SMTP):</strong> Use <code>smtp.zoho.com</code> with Port <code>465</code> (SSL checked) or Port <code>587</code> (TLS).
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>2. Zoho App Password:</strong> If 2FA is active on Zoho, go to <code>accounts.zoho.com</code> → Security → App Passwords and generate an App Password for this website.
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>3. Matching Sender Address:</strong> Keep both Username and Sender Email set to <code>sales@managemyweb.co</code> (Zoho blocks sending from unverified addresses).
                  </li>
                  <li>
                    <strong style={{ color: '#1D1D1F' }}>4. Domain DNS (MX &amp; SPF):</strong> Ensure <code>mx.zoho.com</code> (10), <code>mx2.zoho.com</code> (20), <code>mx3.zoho.com</code> (50), and TXT <code>v=spf1 include:zohomail.com ~all</code> are added in your domain DNS.
                  </li>
                </ul>
              </div>
            </div>

            {/* Dual Client Confirmation Email Templates Editor (Demo Flow vs Quotation Flow) */}
            <div
              style={{
                gridColumn: '1 / -1',
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                padding: '36px',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '22px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                    Automated Confirmation Emails (Demo Flow &amp; Quotation Flow)
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '13.5px', lineHeight: 1.5 }}>
                    Customize both confirmation emails sent when visitors choose either <strong>Step 1: Free 3D Demo</strong> or <strong>Direct Custom Quotation</strong>. Available variables: <code>{'{{firstName}}'}</code>, <code>{'{{storeName}}'}</code>, <code>{'{{packageScope}}'}</code>, <code>{'{{websiteUrl}}'}</code>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSmtpConfig({
                      ...smtpConfig,
                      confirmationSubject: DEFAULT_CONFIRMATION_SUBJECT,
                      confirmationBody: DEFAULT_CONFIRMATION_BODY,
                      quotationSubject: DEFAULT_QUOTATION_SUBJECT,
                      quotationBody: DEFAULT_QUOTATION_BODY,
                    })
                  }
                  className="btn-apple-secondary"
                  style={{ padding: '7px 14px', fontSize: '12.5px' }}
                >
                  Reset Both Templates to Default
                </button>
              </div>

              <form onSubmit={handleSaveSmtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                  {/* Template 1: Demo First */}
                  <div style={{ background: '#F5F5F7', padding: '20px', borderRadius: '16px', border: '1px solid #E5E5EA' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#0066CC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                      Visitor Type 1 · Free 3D Demo First (Step 1 → Step 2 Quote)
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Demo Confirmation Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={smtpConfig.confirmationSubject || DEFAULT_CONFIRMATION_SUBJECT}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, confirmationSubject: e.target.value })}
                        className="ios-input"
                        style={{ background: '#FFFFFF' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Demo Confirmation Body
                      </label>
                      <textarea
                        rows={10}
                        required
                        value={smtpConfig.confirmationBody || DEFAULT_CONFIRMATION_BODY}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, confirmationBody: e.target.value })}
                        className="ios-input"
                        style={{ lineHeight: 1.55, fontFamily: 'inherit', background: '#FFFFFF' }}
                      />
                    </div>
                  </div>

                  {/* Template 2: Direct Quotation Request */}
                  <div style={{ background: '#F5F5F7', padding: '20px', borderRadius: '16px', border: '1px solid #E5E5EA' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#B25000', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                      Visitor Type 2 · Direct Custom Quotation Request
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Quotation Request Confirmation Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={smtpConfig.quotationSubject || DEFAULT_QUOTATION_SUBJECT}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, quotationSubject: e.target.value })}
                        className="ios-input"
                        style={{ background: '#FFFFFF' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '5px', fontWeight: 500 }}>
                        Quotation Request Confirmation Body
                      </label>
                      <textarea
                        rows={10}
                        required
                        value={smtpConfig.quotationBody || DEFAULT_QUOTATION_BODY}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, quotationBody: e.target.value })}
                        className="ios-input"
                        style={{ lineHeight: 1.55, fontFamily: 'inherit', background: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" disabled={smtpLoading} className="btn-apple-blue" style={{ padding: '12px 24px' }}>
                    {smtpLoading ? 'Saving...' : 'Save Both Confirmation Email Templates'}
                  </button>
                </div>
              </form>
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
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settings.contact?.whatsappNumber || '+92 317 4075023'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...(settings.contact || {}), whatsappNumber: e.target.value },
                      })
                    }
                    className="ios-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Sales Contact Email (Used Across Site &amp; Lead Alerts)
                  </label>
                  <input
                    type="email"
                    value={settings.contact?.supportEmail || 'sales@managemyweb.co'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...(settings.contact || {}), supportEmail: e.target.value },
                      })
                    }
                    className="ios-input"
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '18px', marginTop: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                  Google Analytics 4 &amp; Google Search Console
                </div>
                <p style={{ fontSize: '12.5px', color: '#6E6E73', marginBottom: '14px' }}>
                  Paste your GA4 Measurement ID (or full gtag script) and Google Search Console verification tag or token.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Google Analytics 4 ID (e.g. G-XXXXXXXXXX)
                    </label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX or paste full <script>"
                      value={settings.seo?.googleAnalyticsId || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), googleAnalyticsId: e.target.value },
                        })
                      }
                      className="ios-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Google Search Console Verification Code / Meta Tag
                    </label>
                    <input
                      type="text"
                      placeholder='Paste verification code or <meta name="google-site-verification" ... />'
                      value={settings.seo?.googleSiteVerification || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), googleSiteVerification: e.target.value },
                        })
                      }
                      className="ios-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                    Google Tag Manager ID (Optional, e.g. GTM-XXXXXXX)
                  </label>
                  <input
                    type="text"
                    placeholder="GTM-XXXXXXX (optional)"
                    value={settings.seo?.googleTagManagerId || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: { ...(settings.seo || {}), googleTagManagerId: e.target.value },
                      })
                    }
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
                {settingsLoading ? 'Saving...' : 'Save Site, Google & Contact Settings'}
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: GOOGLE ANALYTICS, SEARCH CONSOLE & COOKIES                */}
        {/* ============================================================== */}
        {activeTab === 'cookies' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* GOOGLE ANALYTICS & GOOGLE SEARCH CONSOLE CONFIGURATION CARD */}
            {settings && (
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0071E3', marginBottom: '4px' }}>
                      GOOGLE INTEGRATION &amp; INDEXING SETUP
                    </div>
                    <h3 style={{ fontSize: '21px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
                      Connect Google Analytics 4 &amp; Google Search Console
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#6E6E73', maxWidth: '680px', lineHeight: 1.55 }}>
                      Paste your <strong>Google Analytics Measurement ID</strong> (<code>G-XXXXXXXXXX</code>) and your <strong>Google Search Console HTML Tag</strong> below. Once saved, the verification tag and tracking script are automatically injected across all pages of <strong>managemyweb.co</strong>.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '980px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: settings.seo?.googleAnalyticsId ? '#E8F5E9' : '#F5F5F7',
                        color: settings.seo?.googleAnalyticsId ? '#1D7D3F' : '#6E6E73',
                        border: settings.seo?.googleAnalyticsId ? '1px solid #B7E1CD' : '1px solid #D2D2D7',
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: settings.seo?.googleAnalyticsId ? '#34C759' : '#86868B',
                        }}
                      />
                      GA4: {settings.seo?.googleAnalyticsId ? `Connected (${settings.seo.googleAnalyticsId})` : 'Not Connected'}
                    </span>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '980px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: settings.seo?.googleSiteVerification ? '#E8F5E9' : '#F5F5F7',
                        color: settings.seo?.googleSiteVerification ? '#1D7D3F' : '#6E6E73',
                        border: settings.seo?.googleSiteVerification ? '1px solid #B7E1CD' : '1px solid #D2D2D7',
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: settings.seo?.googleSiteVerification ? '#34C759' : '#86868B',
                        }}
                      />
                      Search Console: {settings.seo?.googleSiteVerification ? 'Verified Tag Active' : 'Not Connected'}
                    </span>
                  </div>
                </div>

                {settingsMsg && (
                  <div
                    style={{
                      background: '#E8F5E9',
                      border: '1px solid #B7E1CD',
                      color: '#1D7D3F',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      marginBottom: '20px',
                    }}
                  >
                    {settingsMsg}
                  </div>
                )}

                <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div
                      style={{
                        background: '#F5F5F7',
                        borderRadius: '14px',
                        padding: '18px',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <label style={{ display: 'block', fontSize: '13px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 600 }}>
                        1. Google Analytics 4 (GA4) Measurement ID
                      </label>
                      <p style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '10px', lineHeight: 1.45 }}>
                        Found in Google Analytics → Admin → Data Streams → Web → Measurement ID (starts with <code>G-</code>). You can paste either the ID or the entire <code>&lt;script&gt;</code> block.
                      </p>
                      <input
                        type="text"
                        placeholder="G-XXXXXXXXXX"
                        value={settings.seo?.googleAnalyticsId || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            seo: { ...(settings.seo || {}), googleAnalyticsId: e.target.value },
                          })
                        }
                        className="ios-input"
                        style={{ background: '#FFFFFF', fontFamily: 'monospace' }}
                      />
                    </div>

                    <div
                      style={{
                        background: '#F5F5F7',
                        borderRadius: '14px',
                        padding: '18px',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <label style={{ display: 'block', fontSize: '13px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 600 }}>
                        2. Google Search Console HTML Verification Tag
                      </label>
                      <p style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '10px', lineHeight: 1.45 }}>
                        In Search Console → Ownership Verification → HTML Tag, copy and paste either the full <code>&lt;meta name=&quot;google-site-verification&quot; ... /&gt;</code> tag or just the content token.
                      </p>
                      <input
                        type="text"
                        placeholder='<meta name="google-site-verification" content="..." />'
                        value={settings.seo?.googleSiteVerification || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            seo: { ...(settings.seo || {}), googleSiteVerification: e.target.value },
                          })
                        }
                        className="ios-input"
                        style={{ background: '#FFFFFF', fontFamily: 'monospace' }}
                      />
                    </div>

                    <div
                      style={{
                        background: '#F5F5F7',
                        borderRadius: '14px',
                        padding: '18px',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <label style={{ display: 'block', fontSize: '13px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 600 }}>
                        3. Google Tag Manager ID (Optional)
                      </label>
                      <p style={{ fontSize: '12px', color: '#6E6E73', marginBottom: '10px', lineHeight: 1.45 }}>
                        Optional container ID if you also use Google Tag Manager (starts with <code>GTM-</code>). Leave blank if using GA4 directly.
                      </p>
                      <input
                        type="text"
                        placeholder="GTM-XXXXXXX"
                        value={settings.seo?.googleTagManagerId || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            seo: { ...(settings.seo || {}), googleTagManagerId: e.target.value },
                          })
                        }
                        className="ios-input"
                        style={{ background: '#FFFFFF', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '14px',
                      paddingTop: '6px',
                    }}
                  >
                    <div style={{ fontSize: '12.5px', color: '#6E6E73' }}>
                      <strong>Sitemap URL to submit in Google Search Console:</strong>{' '}
                      <code style={{ background: '#F5F5F7', padding: '4px 8px', borderRadius: '6px', color: '#1D1D1F' }}>
                        https://managemyweb.co/sitemap.xml
                      </code>
                    </div>

                    <button
                      type="submit"
                      disabled={settingsLoading}
                      className="btn-apple-blue"
                      style={{ padding: '11px 24px', fontSize: '13.5px', fontWeight: 600 }}
                    >
                      {settingsLoading ? 'Saving Google Config...' : 'Save Google Analytics & Search Console'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {/* Cookie Consent KPI Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                {
                  label: 'Total Consent Decisions',
                  value: cookieStore.stats?.totalDecisions || 0,
                  sub: 'Visitors who responded to cookie banner',
                },
                {
                  label: 'Accepted All Cookies',
                  value: `${cookieStore.stats?.acceptedAll || 0} (${cookieStore.stats?.totalDecisions
                      ? Math.round((cookieStore.stats.acceptedAll / cookieStore.stats.totalDecisions) * 100)
                      : 0
                    }%)`,
                  sub: 'Full Analytics + Marketing + 3D',
                },
                {
                  label: 'Analytics Opt-In',
                  value: cookieStore.stats?.analyticsOptIn || 0,
                  sub: `${cookieStore.stats?.customized || 0} customized · ${cookieStore.stats?.essentialOnly || 0} essential only`,
                },
                {
                  label: 'Consented Page Views',
                  value: cookieStore.stats?.totalPageViews || 0,
                  sub: 'Tracked across public pages',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D2D2D7',
                    borderRadius: '18px',
                    padding: '22px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#6E6E73', fontWeight: 500, marginBottom: '6px' }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#86868B' }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Two-Column: Cookie Banner Configuration + Top Visited Pages */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '20px',
                  padding: '32px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                      Cookie Consent Banner Settings
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6E6E73' }}>
                      Control the cookie consent popup shown to visitors across the public website.
                    </p>
                  </div>
                </div>

                {cookieMsg && (
                  <div
                    style={{
                      background: '#E8F5E9',
                      border: '1px solid #B7E1CD',
                      color: '#1D7D3F',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    {cookieMsg}
                  </div>
                )}

                <form onSubmit={handleSaveCookieConfig} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      checked={cookieStore.config?.enabled !== false}
                      onChange={(e) =>
                        setCookieStore({
                          ...cookieStore,
                          config: { ...cookieStore.config, enabled: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#0071E3' }}
                    />
                    Enable Cookie Consent Banner on Public Website
                  </label>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Banner Heading
                    </label>
                    <input
                      type="text"
                      value={cookieStore.config?.bannerTitle || ''}
                      onChange={(e) =>
                        setCookieStore({
                          ...cookieStore,
                          config: { ...cookieStore.config, bannerTitle: e.target.value },
                        })
                      }
                      className="ios-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#1D1D1F', marginBottom: '6px', fontWeight: 500 }}>
                      Banner Consent Message
                    </label>
                    <textarea
                      rows={3}
                      value={cookieStore.config?.bannerText || ''}
                      onChange={(e) =>
                        setCookieStore({
                          ...cookieStore,
                          config: { ...cookieStore.config, bannerText: e.target.value },
                        })
                      }
                      className="ios-input"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '6px' }}>
                    <button type="submit" disabled={cookieLoading} className="btn-apple-blue" style={{ padding: '10px 20px', fontSize: '13px' }}>
                      {cookieLoading ? 'Saving...' : 'Save Cookie Settings'}
                    </button>
                    <button
                      type="button"
                      onClick={fetchCookies}
                      className="btn-apple-secondary"
                      style={{ padding: '10px 16px', fontSize: '13px' }}
                    >
                      Refresh Stats
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCookieStats}
                      className="btn-apple-secondary"
                      style={{ padding: '10px 16px', fontSize: '13px', color: '#D70015' }}
                    >
                      Reset Stats
                    </button>
                  </div>
                </form>
              </div>

              {/* Top Pages & Category Opt-in Breakdown */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: '20px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    Top Consented Pages &amp; Category Opt-In
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6E6E73', marginBottom: '18px' }}>
                    Page views recorded from visitors who accepted analytics cookies.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                    {Object.entries(cookieStore.stats?.pageViewsByPath || {})
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([routePath, count]) => (
                        <div
                          key={routePath}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 14px',
                            background: '#F5F5F7',
                            borderRadius: '10px',
                            fontSize: '13px',
                          }}
                        >
                          <span style={{ fontFamily: 'monospace', color: '#1D1D1F', fontWeight: 500 }}>{routePath}</span>
                          <span style={{ fontWeight: 600, color: '#0066CC' }}>{count} views</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E5E5EA', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#F5F5F7', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#6E6E73' }}>3D Functional</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>{cookieStore.stats?.functionalOptIn || 0}</div>
                  </div>
                  <div style={{ background: '#F5F5F7', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#6E6E73' }}>Analytics</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>{cookieStore.stats?.analyticsOptIn || 0}</div>
                  </div>
                  <div style={{ background: '#F5F5F7', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#6E6E73' }}>Marketing</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>{cookieStore.stats?.marketingOptIn || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Visitor Cookie Consent Log */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #E5E5EA' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                  Recent Visitor Cookie Consent Log
                </h3>
                <p style={{ fontSize: '13px', color: '#6E6E73' }}>
                  Real-time audit trail of visitor cookie preferences across desktop and mobile devices.
                </p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#F5F5F7', borderBottom: '1px solid #D2D2D7' }}>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Visitor ID</th>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Consent Decision</th>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Enabled Categories</th>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Entry Page</th>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Device / Browser</th>
                      <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase' }}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(cookieStore.recentConsents || []).length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '28px', textAlign: 'center', color: '#6E6E73' }}>
                          No visitor consent records yet.
                        </td>
                      </tr>
                    ) : (
                      (cookieStore.recentConsents || []).map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #E5E5EA' }}>
                          <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontWeight: 600, color: '#1D1D1F' }}>
                            {item.visitorId}
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '980px',
                                fontSize: '11.5px',
                                fontWeight: 600,
                                background:
                                  item.decision === 'accepted_all'
                                    ? '#E8F5E9'
                                    : item.decision === 'custom'
                                      ? '#EBF5FF'
                                      : '#F5F5F7',
                                color:
                                  item.decision === 'accepted_all'
                                    ? '#1D7D3F'
                                    : item.decision === 'custom'
                                      ? '#0066CC'
                                      : '#6E6E73',
                              }}
                            >
                              {item.decision === 'accepted_all'
                                ? 'Accepted All'
                                : item.decision === 'custom'
                                  ? 'Customized'
                                  : 'Essential Only'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px', color: '#424245' }}>
                            {[
                              'Essential',
                              item.categories?.functional && '3D Functional',
                              item.categories?.analytics && 'Analytics',
                              item.categories?.marketing && 'Marketing',
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </td>
                          <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: '#0066CC' }}>{item.path}</td>
                          <td style={{ padding: '14px 20px', color: '#424245' }}>{item.device}</td>
                          <td style={{ padding: '14px 20px', color: '#6E6E73' }}>
                            {item.timestamp ? new Date(item.timestamp).toLocaleString() : '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complete Site SEO Audit & Keyword Matrix */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #D2D2D7',
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                    Complete Technical SEO Audit &amp; Keyword Architecture
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6E6E73' }}>
                    Live search engine optimization status across all 16 public routes, structured data schemas, and crawler directives.
                  </p>
                </div>
                <span
                  style={{
                    background: '#E8F5E9',
                    color: '#1D7D3F',
                    border: '1px solid #B7E1CD',
                    padding: '6px 14px',
                    borderRadius: '980px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                  }}
                >
                  SEO Health Score: 100 / 100
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                {[
                  {
                    title: 'JSON-LD @graph Structured Data',
                    detail: 'Organization, ProfessionalService, WebSite, BreadcrumbList, FAQPage, Service & OfferCatalog schemas active.',
                  },
                  {
                    title: 'Multi-Industry E-Commerce Keywords',
                    detail: 'Targeted meta keywords across Fashion, Beauty, Electronics, Watches, Home Furniture & Specialty Retail.',
                  },
                  {
                    title: 'XML Image Sitemap (/sitemap.xml)',
                    detail: '16 canonical routes indexed with Google Image Sitemap extensions and priority weighting.',
                  },
                  {
                    title: 'Search & AI Answer Engine Robots.txt',
                    detail: 'Configured for Googlebot, Bingbot, GPTBot, PerplexityBot & ClaudeBot with /admin and /api/ protected.',
                  },
                  {
                    title: 'Absolute OpenGraph & X Cards',
                    detail: '1200×630 absolute image URLs, hreflang="en" & x-default tags, and canonical link enforcement.',
                  },
                  {
                    title: 'Core Web Vitals & Edge Caching',
                    detail: 'Immutable 1-year image caching headers, Gzip/Brotli compression, and X-Robots-Tag protection.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: '#F5F5F7',
                      padding: '16px 18px',
                      borderRadius: '14px',
                      border: '1px solid #E5E5EA',
                    }}
                  >
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                      ✓ {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6E6E73', lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
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
