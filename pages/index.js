export default function Home() {
  const phoneIntl = "13322910881"; // WhatsApp number (no +)
  const waLink = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
    "Hi! I just visited Managemyweb.co and want help managing my website and tools."
  )}`;

  return (
    <main style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0 }}>Managemyweb</h2>
            <p style={{ margin: 0, color: "#666" }}>
              We manage your web stuff. Simple.
            </p>
          </div>

          <a
            href={waLink}
            style={{
              background: "#111",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            WhatsApp Us
          </a>
        </header>

        {/* Hero */}
        <section style={{ marginTop: "80px", display: "grid", gap: "40px" }}>
          <div>
            <span
              style={{
                background: "#f1f1f1",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              ✅ New business • Web management made easy
            </span>

            <h1 style={{ fontSize: "42px", marginTop: "20px" }}>
              Too many tools to manage?
              <br />
              <span style={{ color: "#666" }}>Don’t worry — we’ll handle it.</span>
            </h1>

            <p style={{ fontSize: "18px", color: "#555", maxWidth: "600px" }}>
              Websites, domains, hosting, email, analytics, SEO basics, landing pages —
              modern businesses use too many tools.  
              <strong> We manage all your web-related work</strong> at very reasonable prices.
            </p>

            <div style={{ marginTop: "30px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <a
                href={waLink}
                style={{
                  background: "#111",
                  color: "#fff",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Message on WhatsApp
              </a>

              <a
                href="#services"
                style={{
                  border: "1px solid #ddd",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: "#111",
                  fontWeight: "600",
                }}
              >
                See what we manage
              </a>
            </div>

            <p style={{ marginTop: "12px", fontSize: "14px", color: "#777" }}>
              WhatsApp Business: <strong>+1 (332) 291-0881</strong>
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" style={{ marginTop: "100px" }}>
          <h2>What we manage</h2>
          <p style={{ color: "#666", maxWidth: "600px" }}>
            If it’s web-related, it’s our responsibility.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              ["Website updates", "Fix issues, edit content, ongoing maintenance."],
              ["Domains & DNS", "No more confusing domain records."],
              ["Hosting & speed", "Keep your site fast and stable."],
              ["Business email", "Professional email setup & fixes."],
              ["Tracking & analytics", "GA4, pixels, conversions done right."],
              ["Landing pages", "High-converting pages for your offers."],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <h4 style={{ marginBottom: "8px" }}>{title}</h4>
                <p style={{ margin: 0, color: "#666" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            marginTop: "100px",
            background: "#111",
            color: "#fff",
            padding: "50px",
            borderRadius: "20px",
          }}
        >
          <h2>Stop worrying about web tools</h2>
          <p style={{ color: "#bbb", maxWidth: "600px" }}>
            Tell us what you’re using — we’ll manage it for you.
          </p>

          <div style={{ marginTop: "25px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <a
              href={waLink}
              style={{
                background: "#fff",
                color: "#111",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              WhatsApp: +1 (332) 291-0881
            </a>

            <a
              href="mailto:hello@managemyweb.co"
              style={{
                border: "1px solid #444",
                padding: "14px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              hello@managemyweb.co
            </a>
          </div>
        </section>

        <footer style={{ marginTop: "60px", fontSize: "14px", color: "#777" }}>
          © {new Date().getFullYear()} Managemyweb.co — All rights reserved.
        </footer>
      </div>
    </main>
  );
}
