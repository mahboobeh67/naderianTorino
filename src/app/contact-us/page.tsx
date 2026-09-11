

import { FaPhoneSquareAlt, FaMailBulk, FaMapPin } from "react-icons/fa";
import styles from "./ContactUs.module.css";

function ContactUs() {
  return (
    <section className={styles.contactSection}>
      {/* عنوان و توضیحات اصلی */}
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>تماس با ما</h1>
        <p className={styles.descriptionBox}>
          سوال یا درخواستی دارید؟ در همه روزهای هفته و در هر ساعت از شبانه‌روز
          می‌توانید از طریق راه‌های زیر با ما در ارتباط باشید.
        </p>
      </div>

      {/* کارت‌های ارتباطی */}
      <div className={styles.cardsGrid}>
        {/* کارت تلفن */}
        <div className={styles.card}>
          <FaPhoneSquareAlt className={styles.icon} size={32} />
          <p className={styles.cardTitle}>تلفن پشتیبانی</p>
          <span className={styles.cardValue}>021 - 40</span>
        </div>

        {/* کارت ایمیل */}
        <div className={styles.card}>
          <FaMailBulk className={styles.icon} size={32} />
          <p className={styles.cardTitle}>ایمیل</p>
          <span className={styles.cardValue}>support@torino.ir</span>
        </div>

        {/* کارت آدرس */}
        <div className={styles.card}>
          <FaMapPin className={styles.icon} size={32} />
          
          <p className={styles.cardTitle}>آدرس دفتر حضوری</p>
          <p className={styles.addressText}>
            یاسوج، اکبرآباد، خیابان امام حسین، فرعی ۶، سمت راست، درب دوم، طبقه اول
          </p>

          <div className={styles.dividerSection}>
            <p className={styles.cardTitle}>آدرس دفتر پشتیبانی</p>
            <p className={styles.addressText}>
              یاسوج، بلوار قرنی، مرکز بهداشت استان، واحد فناوری اطلاعات
            </p>
            <p className={styles.postalCode}>
              کد پستی: ۷۵۹۱۸۸۹۳۷۵
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
