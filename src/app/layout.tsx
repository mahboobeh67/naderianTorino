import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import TanstackQueryProvider from "./components/partials/providers/TanstackQueryProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

const yekanBakh = localFont({
  src: [
    {
      path: "./fonts/YekanBakh-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-Bold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-Fat.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-Heavy.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
});
export const metadata = {
  title: "تورینو | Torino",
  description: "سامانه رزرو آنلاین تورهای مسافرتی",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <body className={yekanBakh.className}>
        <TanstackQueryProvider>
          <Header />
          {children}
          <Footer />
        </TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
