import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome | ManageMyWeb.co</title>
        <meta name="description" content="ManageMyWeb.co — We are developing our system, stay tuned!" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>🚀 Coming Soon!</h1>
        <p style={styles.text}>
          We are developing our system.
          <br />
          <strong>Stay tuned!</strong>
        </p>
        <p style={styles.subText}>📌 ManageMyWeb.co</p>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#111",
  },
  text: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "12px",
  },
  subText: {
    fontSize: "18px",
    color: "#555",
  },
};
