import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.mmwConsent = { analytics: false, marketing: false };
  try {
    var saved = localStorage.getItem('mmw_cookie_consent');
    if (saved) {
      var parsed = JSON.parse(saved);
      window.mmwConsent.analytics = Boolean(parsed && parsed.categories && parsed.categories.analytics);
      window.mmwConsent.marketing = Boolean(parsed && parsed.categories && parsed.categories.marketing);
    }
  } catch (e) {}
  gtag('consent', 'default', {
    ad_storage: window.mmwConsent.marketing ? 'granted' : 'denied',
    ad_user_data: window.mmwConsent.marketing ? 'granted' : 'denied',
    ad_personalization: window.mmwConsent.marketing ? 'granted' : 'denied',
    analytics_storage: window.mmwConsent.analytics ? 'granted' : 'denied',
    wait_for_update: 500
  });
  gtag('js', new Date());
  gtag('config', 'G-FRZWT4PP1R', { anonymize_ip: true });
`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FRZWT4PP1R" />
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-T3QGMSXW" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "zam6096348");
    window.clarity('consent', Boolean(window.mmwConsent && window.mmwConsent.analytics));
`,
          }}
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
