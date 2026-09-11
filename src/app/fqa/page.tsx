import FAQ from "../components/Fqa";

export default function Page() {
  return (
    <div
      style={{
        padding: "2.5rem 1rem",
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 50%, #c8e6c9 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        direction: "rtl",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#ffffff",
          background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
          borderRadius: "1rem",
          maxWidth: "400px",
          width: "100%",
          padding: "0.75rem 1.5rem",
          boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3)",
          letterSpacing: "-0.025em",
        }}
      >
        سوالات متداول
      </h1>

      <div style={{ width: "100%", maxWidth: "48rem" }}>
        <FAQ />
      </div>
    </div>
  );
}