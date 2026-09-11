import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
      
        <div className={styles.imageWrapper}>
          <Image
            src="/images/Error TV.png" 
            alt="صفحه مورد نظر یافت نشد"
            width={380}
            height={300}
            priority
            unoptimized
          />
        </div>

      
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>صفحه مورد نظر یافت نشد!</h1>
          <Link href="/" className={styles.button}>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

