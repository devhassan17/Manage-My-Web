import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import CookieConsent from '../components/CookieConsent';

export default function App({ Component, pageProps }) {
  const [seoConfig, setSeoConfig] = useState({
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.seo) {
          setSeoConfig((prev) => ({
            googleAnalyticsId: data.seo.googleAnalyticsId || prev.googleAnalyticsId,
            googleSiteVerification: data.seo.googleSiteVerification || prev.googleSiteVerification,
            googleTagManagerId: data.seo.googleTagManagerId || prev.googleTagManagerId,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FBFBFD" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        {seoConfig.googleSiteVerification && (
          <meta name="google-site-verification" content={seoConfig.googleSiteVerification} />
        )}
      </Head>

      {seoConfig.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seoConfig.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="mmw-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seoConfig.googleAnalyticsId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {seoConfig.googleTagManagerId && (
        <Script id="mmw-gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${seoConfig.googleTagManagerId}');
          `}
        </Script>
      )}

      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}
