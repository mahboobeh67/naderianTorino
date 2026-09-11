import Link from "next/link";
import styles from "./PaymentPage.module.css";

interface PaymentPageProps {
  searchParams: Promise<{ status?: string }>;
}

async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* آیکون وضعیت */}
        <div
          className={`${styles.iconWrapper} ${
            isSuccess ? styles.iconSuccess : styles.iconError
          }`}
        >
          {isSuccess ? (
            <svg
              className={styles.svgIcon}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className={styles.svgIcon}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* عنوان و توضیح */}
        <h1
          className={`${styles.title} ${
            isSuccess ? styles.titleSuccess : styles.titleError
          }`}
        >
          {isSuccess ? "پرداخت با موفقیت انجام شد!" : "پرداخت ناموفق بود"}
        </h1>

        <p className={styles.description}>
          {isSuccess
            ? "سفارش شما ثبت شد و بلیت سفر به زودی در پنل کاربری‌تان قابل مشاهده است. سفر خوبی داشته باشید! 🧳"
            : "متاسفانه تراکنش با مشکل مواجه شد. مبلغ پرداختی حداکثر تا ۷۲ ساعت آینده به حساب شما بازمی‌گردد."}
        </p>

        {/* دکمه‌های کنشی */}
        <div className={styles.actions}>
          {isSuccess ? (
            <>
              <Link href="/profile/my-tours" className={styles.btnPrimary}>
                مشاهده سفرهای من
              </Link>
              <Link href="/" className={styles.btnSecondary}>
                صفحه اصلی
              </Link>
            </>
          ) : (
            <Link href="/" className={styles.btnPrimary}>
              تلاش مجدد
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;


