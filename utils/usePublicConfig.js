import { useState, useEffect } from 'react';

const DEFAULT_CONTACT = {
  whatsappNumber: '+92 317 4075023',
  supportEmail: 'sales@managemyweb.co',
};

/**
 * Fetches public studio contact details without hitting authenticated admin endpoints.
 */
export function usePublicContact() {
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    let active = true;
    fetch('/api/public-config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data && data.contact) {
          setContactInfo({
            whatsappNumber: data.contact.whatsappNumber || DEFAULT_CONTACT.whatsappNumber,
            supportEmail: data.contact.supportEmail || DEFAULT_CONTACT.supportEmail,
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const waRaw = (contactInfo.whatsappNumber || '923174075023').replace(/[^0-9]/g, '');
  return { contactInfo, waRaw };
}

