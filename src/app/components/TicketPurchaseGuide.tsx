"use client";

import {
  Search,
  Ticket,
  CalendarDays,
  Filter,
  User,
  CreditCard,
} from "lucide-react";
import styles from "./TicketPurchaseGuide.module.css";

interface Step {
  icon: typeof Ticket;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Ticket,
    title: "ورود به بخش خرید بلیط",
    description:
      "برای شروع خرید بلیط، وارد صفحه اصلی وب‌سایت تورینو شوید و روی گزینه «خرید بلیط» کلیک کنید. در این صفحه می‌توانید نوع بلیط خود را انتخاب کنید؛ یک‌طرفه یا رفت‌وبرگشت.",
  },
  {
    icon: Search,
    title: "جستجوی بلیط",
    description:
      "در این مرحله باید اطلاعات سفر شامل مبدا، مقصد، تاریخ رفت یا رفت‌وبرگشت و تعداد مسافران را وارد کنید. سپس روی دکمه «جستجو» کلیک کنید تا لیست بلیط‌های موجود نمایش داده شود.",
  },
  {
    icon: CalendarDays,
    title: "بررسی تقویم قیمتی",
    description:
      "پس از جستجو، لیست بلیط‌ها نمایش داده می‌شود. در بالای نتایج، تقویم قیمتی را مشاهده می‌کنید که نشان می‌دهد در چه روزهایی قیمت بلیط ارزان‌تر است.",
  },
  {
    icon: Filter,
    title: "مرتب‌سازی و فیلتر نتایج",
    description:
      "در بالای نتایج می‌توانید بلیط‌ها را براساس قیمت یا ساعت حرکت مرتب کنید. همچنین در سمت راست صفحه فیلترهایی وجود دارد که به شما کمک می‌کنند سریع‌تر بلیط مناسب خود را پیدا کنید.",
  },
  {
    icon: Ticket,
    title: "انتخاب بلیط",
    description:
      "پس از بررسی نتایج، بلیط موردنظر خود را انتخاب کنید. در این بخش اطلاعاتی مانند ساعت حرکت، شماره پرواز، مدت زمان پرواز و میزان بار مجاز نمایش داده می‌شود.",
  },
  {
    icon: User,
    title: "وارد کردن اطلاعات مسافران",
    description:
      "در این مرحله باید اطلاعات شخصی مسافران را وارد کنید. اگر بلیط را برای شخص دیگری خریداری می‌کنید، می‌توانید ایمیل یا شماره موبایل مسافر را وارد کنید تا اطلاعات سفر برای او ارسال شود.",
  },
  {
    icon: CreditCard,
    title: "تکمیل فرایند خرید",
    description:
      "پس از تکمیل اطلاعات و تایید قوانین و مقررات، روی دکمه «ادامه فرایند خرید» کلیک کنید تا وارد مرحله پرداخت شوید و خرید خود را نهایی کنید.",
  },
];

export default function TicketPurchaseGuide() {
  return (
    <div className={styles.timelineContainer}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className={styles.stepItem}>
            {/* خط اتصال عمودی (برای آخرین آیتم رندر نمی‌شود) */}
            {!isLast && <div className={styles.connectorLine} />}

            {/* آیکون مرحله */}
            <div className={styles.iconWrapper}>
              <Icon size={20} strokeWidth={2.2} />
            </div>

            {/* محتوا و متون مرحله */}
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepBadge}>{index + 1}</span>
                {step.title}
              </h3>

                <p className={styles.stepDescription}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
