import Image from "next/image";
import Link from "next/link";
import styles from "./TourCard.module.css";

// 1. تعریف دقیقی از تایپ Tour مطابق Swagger API تورینو
export interface Tour {
  id: string;
  title: string;
  image?: string;
  startDate?: string | string[];
  endDate?: string | string[];
  price: number;
  fleetVehicle?: string;
  availableSeats?: number;
  insurance?: boolean | string;
  options?: string[];
  origin?: { id: string; name: string };
  destination?: { id: string; name: string };
}

interface TourCardProps {
  tour: Tour;
}

// تابع تبدیل اعداد انگلیسی به فارسی (مثل: 3 -> ۳)
const toPersianNumber = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
};

// تابع فرمت قیمت با کاما (مثل: 12000000 -> ۱۲,۰۰۰,۰۰۰)
const formatPrice = (price: number): string => {
  if (!price && price !== 0) return "۰";
  const formatted = new Intl.NumberFormat("fa-IR").format(price);
  return formatted;
};

// دریافت آدرس صحیح تصویر از API یا فال‌بک موقت
const getImageUrl = (img?: string): string => {
  if (!img) return "https://via.placeholder.com/300x160?text=Torino";
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:6500";
  const cleanPath = img.startsWith("/") ? img : `/${img}`;
  return `${baseUrl}${cleanPath}`;
};

// استخراج نام ماه شمسی (مثل: مهر ماه)
const getPersianMonth = (dateInput?: string | string[]): string => {
  if (!dateInput) return "";
  const dateStr = Array.isArray(dateInput) ? dateInput[0] : dateInput;
  try {
    const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
      new Date(dateStr)
    );
    return `${month} ماه`;
  } catch {
    return "";
  }
};

// محاسبه تعداد روزهای سفر (مثلاً از ۲ مهر تا ۴ مهر -> ۳ روزه)
const getDays = (
  startInput?: string | string[],
  endInput?: string | string[]
): number => {
  if (!startInput || !endInput) return 0;
  const startStr = Array.isArray(startInput) ? startInput[0] : startInput;
  const endStr = Array.isArray(endInput) ? endInput[0] : endInput;

  try {
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays + 1 : 1;
  } catch {
    return 0;
  }
};

// ساخت زیرنویس استاندارد کارت مطابق فیگما
const buildSubtitle = (tour: Tour): string => {
  const parts: string[] = [];

  // ۱. ماه برگزاری
  const month = getPersianMonth(tour.startDate);
  if (month) parts.push(month);

  // ۲. مدت زمان (تعداد روز)
  const days = getDays(tour.startDate, tour.endDate);
  if (days > 0) parts.push(`${toPersianNumber(days)} روزه`);

  // ۳. وسیله نقلیه (ترجمه کلمات انگلیسی Swagger)
  if (tour.fleetVehicle) {
    const vehicleMap: Record<string, string> = {
      Bus: "اتوبوس",
      Flight: "پرواز",
      Airplane: "پرواز",
      Plane: "پرواز",
      Train: "قطار",
      Van: "ون",
    };
    parts.push(vehicleMap[tour.fleetVehicle] ?? tour.fleetVehicle);
  }

  // ۴. بیمه یا آپشن‌های همراه تور
  if (tour.insurance) {
    const insuranceText =
      typeof tour.insurance === "boolean"
        ? "بیمه"
        : tour.insurance === "Comprehensive"
        ? "بیمه کامل"
        : tour.insurance;
    parts.push(insuranceText);
  }

  return parts.join(" . ");
};

function TourCard({ tour }: TourCardProps) {
  const imageUrl = getImageUrl(tour.image);
  const subtitle = buildSubtitle(tour);

  return (
    <div className={styles.card}>
      {/* تصویر تور */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={tour.title || "تصویر تور"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={styles.image}
          unoptimized={process.env.NODE_ENV === "development"}
        />
      </div>

      {/* محتوای کارت */}
      <div className={styles.content}>
        <h3 className={styles.title} title={tour.title}>
          {tour.title}
        </h3>

        {/* زیرنویس استاندارد (مهر ماه . ۳ روزه . اتوبوس . بیمه) */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <div className={styles.divider} />

        {/* فوتر کارت شامل دکمه رزرو و قیمت */}
        <div className={styles.footer}>
          <Link href={`/tours/${tour.id}`} className={styles.reserveBtn}>
            رزرو
          </Link>

          <div className={styles.priceWrapper}>
            <span className={styles.priceAmount}>
              {formatPrice(tour.price)}
            </span>
            <span className={styles.priceCurrency}>تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
