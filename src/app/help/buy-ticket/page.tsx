import TicketPurchaseGuide from "../../components/TicketPurchaseGuide";
import { CSSProperties } from "react";

export default function Page() {
  // تعریف مرتب آبجکت‌های استایل (Clean Code)
  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "3rem 1rem",
      direction: "rtl",
      boxSizing: "border-box",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "#ffffff",
      backgroundColor: "#16a34a", // سبز برند تورینو
      borderRadius: "1rem",
      maxWidth: "500px",
      margin: "0 auto 2.5rem auto",
      padding: "1rem 1.5rem",
      textAlign: "center",
      boxShadow: "0 10px 20px -5px rgba(22, 163, 74, 0.35)",
      letterSpacing: "-0.02em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
         راهنمای گام‌به‌گام خرید بلیط
      </h1>

      <TicketPurchaseGuide />
    </main>
  );
}
