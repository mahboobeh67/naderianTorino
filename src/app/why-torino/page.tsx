import { HelpCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StandardsSlider from "../components/StandardsSlider";

import styles from "./WhyTorino.module.css";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function WhyTorino() {
  return (
    <section className={styles.section}>
      {/* خرید تلفنی */}
      <div className={styles.phoneBookingWrapper}>
        {/* بنر تبلیغاتی */}
        <div className={styles.promoBanner}>
          <div>
            <h2 className={styles.promoTitle}>
              خرید تلفنی از <span className={styles.brandHighlight}>تورینو</span>
            </h2>
            <p className={styles.promoSubtitle}>به هر کجا که می‌خواهید!</p>
          </div>

          <Image
            src="/images/torino.png"
            alt="پشتیبان تورینو"
            className={styles.operatorImg}
            width={300}
            height={300}
          />
        </div>

        {/* شماره تماس */}
        <div className={styles.phoneBox}>
          <div className={styles.phoneGroup}>
            <Phone className={styles.phoneIcon} size={20} />
            <p className={styles.phoneNumber}>021-1840</p>
          </div>

          <Link href="#" className={styles.moreInfoBtn}>
            اطلاعات بیشتر
          </Link>
        </div>
      </div>

      {/* چرا تورینو */}
      <div className={styles.aboutGrid}>
        {/* متن توضیحات */}
        <div className={styles.textContent}>
          <div className={styles.titleRow}>
            <HelpCircle className={styles.questionIcon} size={24} />
            <h3 className={styles.mainHeading}>
              چرا <span className={styles.brandGreen}>تورینو</span>؟
            </h3>
          </div>

          <p className={styles.subHeading}>تور طبیعت‌گردی و تاریخی</p>

          <p className={styles.description}>
            اگر دوست داشته باشید یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم‌گردی اتاق بگیرید،
            تورهای طبیعت‌گردی بهترین انتخاب هستند. همچنین اگر علاقه‌مند
            به بازدید از آثار تاریخی باشید می‌توانید تورهای فرهنگی و
            تاریخی را انتخاب کنید.
          </p>
        </div>

        {/* اسلایدر */}
        <div className={styles.sliderContainer}>
          <StandardsSlider />
        </div>
      </div>

      {/* لیست مزایا */}
      <div className={styles.featuresList}>
        <FeatureCard
          icon="/images/Group 16.svg"
          title="بصرفه‌ترین قیمت"
          description="ارزان‌ترین قیمت تور را از ما بخواهید"
        />

        <FeatureCard
          icon="/images/Group 17.svg"
          title="پشتیبانی"
          description="پشتیبانی ۲۴ ساعته در تمامی مراحل سفر"
        />

        <FeatureCard
          icon="/images/Group 18.svg"
          title="رضایت کاربران"
          description="رضایت بیش از ده هزار کاربر از تورهای ما"
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <img src={icon} alt={title} className={styles.featureIcon} />

      <div className={styles.featureInfo}>
        <h4 className={styles.featureTitle}>{title}</h4>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default WhyTorino;

