import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coming Soon - ManageMyWeb.co</title>
        <meta
          name="description"
          content="ManageMyWeb.co – We are developing our system. Stay tuned!"
        />
      </Head>

      <div style={styles.container}>
        <h1 style={styles.title}>Coming Soon!</h1>
        <p style={styles.text}>
          We are developing our system.
          <br />
          Stay tuned!
        </p>
        <p style={styles.subText}>ManageMyWeb.co</p>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111111",
  },
  text: {
    fontSize: "22px",
    color: "#333333",
    lineHeight: "1.4",
    marginBottom: "8px",
  },
  subText: {
    fontSize: "18px",
    color: "#555555",
    marginTop: "6px",
  },
};
