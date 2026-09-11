"use client";

import { useGetUserTours } from "../../core/services/queries";
import styles from "./MyTours.module.css";

const fa = new Intl.NumberFormat("fa-IR");

// تبدیل نام وسیله نقلیه به فارسی
const vehicleLabels: Record<string, string> = {
  bus: "اتوبوس",
  van: "ون",
  suv: "شاسی‌بلند",
  airplane: "هواپیما",
  flight: "هواپیما",
  train: "قطار",
  boat: "کشتی",
};

// تبدیل تاریخ میلادی/شمسی به فرمت: «دوشنبه ۱۵ شهریور ۱۴۰۲»
const formatPersianDate = (dateStr?: string): string => {
  if (!dateStr) return "---";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

// آیکن‌های وسیله نقلیه بر اساس فیگما
const VehicleIcon = ({ vehicle = "" }: { vehicle: string }) => {
  const v = vehicle.toLowerCase();
  if (v.includes("air") || v.includes("flight") || v.includes("هواپیما")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l4.2 4.2-2.3 2.3-2.4-.4a.5.5 0 0 0-.5.8l2.4 2.4.8 2.4a.5.5 0 0 0 .8.5l2.3-2.3 4.2 4.2a.5.5 0 0 0 .8-.5L13 16l2.3-2.3" />
      </svg>
    );
  }
  if (v.includes("bus") || v.includes("اتوبوس")) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="15" rx="2" />
        <path d="M4 11h16M8 21v-2M16 21v-2M8 15h.01M16 15h.01" />
      </svg>
    );
  }
  // پیش‌فرض یا SUV
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11M3 17v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3M3 17h18M3 17v2M21 17v2" />
    </svg>
  );
};

// آیکن طلوع خورشید / مبدأ
const SunOriginIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#080d09" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v3M4.93 4.93l2.12 2.12M2 12h3M19.07 4.93l-2.12 2.12M22 12h-3" />
    <path d="M16 16a4 4 0 0 0-8 0" />
    <path d="M3 20h18" />
  </svg>
);
// تابع کمکی برای فرمت شماره تور (چه عدد باشه چه رشته alphanumeric)
const formatTourCode = (code: any): string => {
  if (!code && code !== 0) return "---";

  // اگر خودش عدد بود، فرمت فارسی
  if (typeof code === "number" || (!isNaN(Number(code)) && String(code).trim() !== "")) {
    return fa.format(Number(code));
  }

  // برای UUID: ارقام رو استخراج کن و یه عدد ۸ رقمی یکتا بساز
  const digits = String(code).replace(/\D/g, ""); // فقط ارقام
  const shortCode = digits.slice(-8) || String(code).slice(0, 8); // ۸ رقم آخر
  return fa.format(Number(shortCode));
};

export default function MyToursPage() {
  const { data, isLoading, isError } = useGetUserTours();

  // انعطاف‌پذیری برای استخراج آرایه تورها از ریسپانس‌های مختلف سرور
  const toursList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  if (isLoading) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.spinner}></div>
        <p>در حال بارگذاری لیست تورها... ⏳</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.centerContainer}>
        <p className={styles.errorText}>خطا در دریافت اطلاعات تورها! لطفاً دوباره تلاش کنید.</p>
      </div>
    );
  }

  if (toursList.length === 0) {
    return (
      <div className={styles.centerContainer}>
        <p className={styles.emptyText}>هنوز هیچ توری رزرو نکرده‌اید! 🧳</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {toursList.map((item: any) => {
        // نرمال‌سازی دیتای برگشتی از سرور (چه تور تو در تو باشه چه مستقیم)
        const tourData = item?.tour || item;
        const vehicleKey = (tourData?.fleet || tourData?.fleetVehicle || "").toLowerCase();
        const vehicleName = vehicleLabels[vehicleKey] || tourData?.fleet || "سفر با تور";

        const originName = typeof tourData?.origin === "object" ? tourData.origin?.name : tourData?.origin || "نامشخص";
        const destName = typeof tourData?.destination === "object" ? tourData.destination?.name : tourData?.destination || "نامشخص";
        
        // وضعیت برگزاری تور بر اساس تاریخ اتمام
        const isFinished = tourData?.endDate ? new Date(tourData.endDate).getTime() < Date.now() : true;
        const orderNumber = item?.orderNumber || item?.id || tourData?.id || "---";
        const paidPrice = item?.totalPrice || item?.price || tourData?.price || 0;

        return (
          <article key={item?.id || tourData?.id} className={styles.tourCard}>
            {/* ردیف ۱: آیکن + عنوان تور | نوع سفر و وسیله | برچسب وضعیت */}
            <header className={styles.cardHeader}>
              <div className={styles.titleGroup}>
                <SunOriginIcon />
                <h3 className={styles.title}>{tourData?.title || `${originName} به ${destName}`}</h3>
              </div>

              <div className={styles.vehicleGroup}>
                <VehicleIcon vehicle={tourData?.fleet || tourData?.fleetVehicle} />
                <span>سفر با {vehicleName}</span>
              </div>

              <span className={`${styles.badge} ${isFinished ? styles.badgeFinished : styles.badgeOngoing}`}>
                {isFinished ? "به اتمام رسیده" : "در حال برگزاری"}
              </span>
            </header>

            {/* ردیف ۲: مبدأ به مقصد و تاریخ رفت | تاریخ برگشت */}
            <div className={styles.datesRow}>
              <div className={styles.routeDate}>
                <strong>{originName} به {destName}</strong>
                <span className={styles.dot}>•</span>
                <span>{formatPersianDate(tourData?.startDate)}</span>
              </div>

              <div className={styles.returnDate}>
                <span>تاریخ برگشت</span>
                <span className={styles.dot}>•</span>
                <span>{formatPersianDate(tourData?.endDate)}</span>
              </div>
            </div>

            <div className={styles.divider} />

            {/* ردیف ۳: شماره تور | مبلغ پرداخت شده */}
            <footer className={styles.cardFooter}>
              <div className={styles.orderCode}>
    شماره تور <span>{formatTourCode(item?.orderNumber || item?.id || tourData?.id || tourData?.code)}</span>
  </div>

              <div className={styles.priceContainer}>
                <span>مبلغ پرداخت شده</span>
                <span className={styles.priceValue}>{fa.format(paidPrice)}</span>
                <span className={styles.currency}>تومان</span>
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}


