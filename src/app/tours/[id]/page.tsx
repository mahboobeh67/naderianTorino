import Image from "next/image";
import ReserveButton from "../../components/atoms/ReserveButton/page";
import { serverFetch } from "../../core/services/http";
import styles from "./TourDetails.module.css";

// تابع کمکی برای تبدیل تاریخ میلادی به شمسی
function toJalaliDate(isoString?: string) {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// محاسبه تعداد روز و شب
function calculateDuration(start?: string, end?: string) {
  if (!start || !end) return "مشخص نشده";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} روز و ${diffDays > 0 ? diffDays - 1 : 0} شب`;
}

async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tourData = await serverFetch(`/tour/${id}`, undefined, {
    cache: "no-store",
  });

  if (!tourData) {
    return <div className={styles.container}>اطلاعات تور یافت نشد.</div>;
  }

  // استخراج فیلدها از API
  const {
    title,
    image,
    price,
    startDate,
    endDate,
    fleetVehicle,
    availableSeats,
    insurance,
    origin,
    leader,
  } = tourData;
// تابع کمکی برای اصلاح آدرس تصویر
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getValidImageUrl(imgUrl?: string) {
  if (!imgUrl) return "/images/default-tour.jpg"; // عکس پیش‌فرض در پوشه public
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
    return imgUrl;
  }
  return `${API_BASE_URL}${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
}

  return (
    <div className={styles.container}>
      {/* 1. کارت اصلی تور شامل بنر و مشخصات اصلی */}
      <div className={styles.mainCard}>
        {/* بنر سمت راست */}
        <div className={styles.imageWrapper}>
          <Image
            src={getValidImageUrl(image)}
            alt={title || "تور گردشگری"}
            width={420}
            height={280}
            className={styles.tourImage}
            priority
            unoptimized
          />
        </div>

        {/* مشخصات سمت چپ */}
        <div className={styles.infoWrapper}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.durationText}>
              {calculateDuration(startDate, endDate)}
            </p>

            {/* ویژگی‌ها (لیدر، مبدا، برنامه سفر، تضمین کیفیت) */}
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
               
                <Image src="/images/user-tick.svg" alt="" width={20} height={20}/>
                <span>
                  {leader || "تورلیدر مجرب از مبدا"}</span>
              </div>

              <div className={styles.featureItem}>
                 <Image src="/images/map.svg" alt="" width={20} height={20}/>
                <span>برنامه سفر</span>
              </div>

              <div className={styles.featureItem}>
                <Image src="/images/medal-star.svg" alt="" width={20} height={20}/>
                <span>تضمین کیفیت</span>
              </div>
            </div>
          </div>

          {/* ردیف قیمت و دکمه رزرو */}
          <div className={styles.actionRow}>
           
            <div className={styles.priceWrapper}>
              <span className={styles.priceNumber}>
                {price ? price.toLocaleString("fa-IR") : "۰"}
              </span>
              <span className={styles.priceUnit}>تومان</span>
            </div>
             <ReserveButton id={id}   />
          </div>
        </div>
      </div>

      {/* 2. ستون‌های پایین (تاریخ رفت، تاریخ برگشت، حمل و نقل، ظرفیت، بیمه) */}
      <div className={styles.detailsGrid}>
        {/* مبدأ */}
        <div className={styles.detailColumn}>
          <Image src="/images/routing-2.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>مبدا</div>
            <div className={styles.detailValue}>{origin?.name || "سنندج"}</div>
          </div>
        </div>

        {/* تاریخ رفت */}
        <div className={styles.detailColumn}>
         <Image src="/images/calendar.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>تاریخ رفت</div>
            <div className={styles.detailValue}>{toJalaliDate(startDate)}</div>
          </div>
        </div>

        {/* تاریخ برگشت */}
        <div className={styles.detailColumn}>
          <Image src="/images/calendar.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>تاریخ برگشت</div>
            <div className={styles.detailValue}>{toJalaliDate(endDate)}</div>
          </div>
        </div>

        {/* حمل و نقل */}
        <div className={styles.detailColumn}>
        <Image src="/images/bus.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>حمل و نقل</div>
            <div className={styles.detailValue}>{fleetVehicle || "اتوبوس"}</div>
          </div>
        </div>

        {/* ظرفیت */}
        <div className={styles.detailColumn}>
         <Image src="/images/profile-2user.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>ظرفیت</div>
            <div className={styles.detailValue}>
              {availableSeats ? `حداکثر ${availableSeats} نفر` : "حداکثر ۳۰ نفر"}
            </div>
          </div>
        </div>

        {/* بیمه */}
        <div className={styles.detailColumn}>
           <Image src="/images/security.svg" alt="" width={20} height={20}/>
          <div>
            <div className={styles.detailLabel}>بیمه</div>
            <div className={styles.detailValue}>
              {insurance || "بیمه ۵۰ هزار دیناری"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailsPage;

