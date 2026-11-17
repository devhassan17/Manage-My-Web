/**
 * Privacy-first, consent-aware analytics & UTM attribution utilities.
 * Sends non-PII event metadata only after verified user consent / API completion.
 */

const UTM_STORAGE_KEY = 'mmw_attribution_v1';
const FIRED_LEADS = new Set();

export function captureUtmParams() {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search || '');
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';
    const utmTerm = params.get('utm_term') || '';
    const utmContent = params.get('utm_content') || '';

    const existing = JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || 'null');
    if (utmSource || utmMedium || utmCampaign || !existing) {
      sessionStorage.setItem(
        UTM_STORAGE_KEY,
        JSON.stringify({
          utmSource: utmSource || existing?.utmSource || '',
          utmMedium: utmMedium || existing?.utmMedium || '',
          utmCampaign: utmCampaign || existing?.utmCampaign || '',
          utmTerm: utmTerm || existing?.utmTerm || '',
          utmContent: utmContent || existing?.utmContent || '',
          landingPage: existing?.landingPage || window.location.pathname || '/',
          referrer: existing?.referrer || document.referrer || '',
        })
      );
    }
  } catch (e) {
    // non-blocking
  }
}

export function getAttributionPayload() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

export function syncConsentState(categories = {}) {
  if (typeof window === 'undefined') return;
  const analyticsGranted = Boolean(categories.analytics);
  const marketingGranted = Boolean(categories.marketing);

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: marketingGranted ? 'granted' : 'denied',
      ad_user_data: marketingGranted ? 'granted' : 'denied',
      ad_personalization: marketingGranted ? 'granted' : 'denied',
    });
  }

  if (typeof window.clarity === 'function') {
    try {
      window.clarity('consent', analyticsGranted);
    } catch (e) {
      // ignore if clarity queue not yet ready
    }
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('mmw_cookie_consent');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.categories?.analytics);
  } catch (e) {
    return false;
  }
}

/**
 * Fires GA4 lead conversion strictly after API success without PII.
 */
export function trackLeadConversion({ requestType = 'demo', packageName = '', leadId = '' }) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  if (leadId && FIRED_LEADS.has(leadId)) return;
  if (leadId) FIRED_LEADS.add(leadId);

  const eventName = requestType === 'quotation' ? 'generate_lead_quotation' : 'generate_lead_demo';

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      lead_type: requestType,
      service_scope: packageName || 'unspecified',
      currency: 'USD',
      value: 0,
    });
    window.gtag('event', eventName, {
      service_scope: packageName || 'unspecified',
    });
  }
}

/**
 * Fires outbound WhatsApp click event when analytics consent is active.
 */
export function trackWhatsAppClick(locationLabel = 'general') {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'outbound_whatsapp_click', {
      click_location: locationLabel,
    });
  }
}

