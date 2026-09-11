"use client";

import { Plane, MapPin, ShieldCheck, Headphones } from "lucide-react";
import Image from "next/image";
import styles from "./TourinoTrips.module.css";
import Link from "next/link";

export default function TourinoTrips() {
  return (
    <div className={styles.container}>

      {/* HERO */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>با تورینو دنیا را راحت‌تر کشف کنید</h1>
        <p className={styles.heroSubtitle}>
          رزرو بلیط، تورهای گردشگری و برنامه‌ریزی سفر در یک پلتفرم ساده و مطمئن
        </p>
        
        <button className={styles.heroButton}>
          <Link href="/">شروع سفر</Link>
          </button>
      </section>

      {/* SERVICES */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>خدمات گردشگری تورینو</h2>
        <div className={styles.servicesGrid}>
          
          <div className={styles.serviceCard}>
            <div className={styles.iconWrapper}>
              <Plane className={styles.serviceIcon} size={32} />
            </div>
            <h3 className={styles.serviceTitle}>رزرو بلیط</h3>
            <p className={styles.serviceDesc}>خرید سریع بلیط هواپیما برای مسیرهای داخلی و خارجی</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.iconWrapper}>
              <MapPin className={styles.serviceIcon} size={32} />
            </div>
            <h3 className={styles.serviceTitle}>تورهای گردشگری</h3>
            <p className={styles.serviceDesc}>تورهای متنوع داخلی و خارجی با بهترین برنامه سفر</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.iconWrapper}>
              <Headphones className={styles.serviceIcon} size={32} />
            </div>
            <h3 className={styles.serviceTitle}>پشتیبانی سفر</h3>
            <p className={styles.serviceDesc}>تیم پشتیبانی تورینو در تمام مراحل سفر همراه شماست</p>
          </div>

        </div>
      </section>

      {/* WHY US */}
      <section className={styles.whyUsSection}>
        <div className="max-w-6xl mx-auto">
          <h2 className={styles.sectionTitle}>چرا تورینو؟</h2>
          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsItem}>
              <ShieldCheck size={40} className={styles.serviceIcon} />
              <h3 className={styles.serviceTitle}>رزرو مطمئن</h3>
              <p className={styles.serviceDesc}>پرداخت امن و تضمین کیفیت خدمات گردشگری</p>
            </div>

            <div className={styles.whyUsItem}>
              <Plane size={40} className={styles.serviceIcon} />
              <h3 className={styles.serviceTitle}>تنوع مقصد</h3>
              <p className={styles.serviceDesc}>دسترسی به مقصدهای متنوع داخلی و خارجی</p>
            </div>

            <div className={styles.whyUsItem}>
              <Headphones size={40} className={styles.serviceIcon} />
              <h3 className={styles.serviceTitle}>پشتیبانی سریع</h3>
              <p className={styles.serviceDesc}>پاسخگویی سریع تیم پشتیبانی در هر زمان</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>مقاصد محبوب</h2>
        <div className={styles.destinationsGrid}>

          <div className={styles.destCard}>
            <div className={styles.imageContainer}>
              <Image src="/images/gheshm.jpg" alt="Istanbul" fill className={styles.destImage} />
            </div>
            <div className={styles.destContent}>
              <h3 className={styles.destTitle}>استانبول</h3>
              <p className={styles.destInfo}>تورهای ویژه استانبول</p>
            </div>
          </div>

          <div className={styles.destCard}>
            <div className={styles.imageContainer}>
              <Image src="/images/dobay.jpg" alt="Dubai" fill className={styles.destImage} />
            </div>
            <div className={styles.destContent}>
              <h3 className={styles.destTitle}>دبی</h3>
              <p className={styles.destInfo}>تورهای جذاب دبی</p>
            </div>
          </div>

          <div className={styles.destCard}>
            <div className={styles.imageContainer}>
              <Image src="/images/kish.jpg" alt="Kish" fill className={styles.destImage} />
            </div>
            <div className={styles.destContent}>
              <h3 className={styles.destTitle}>کیش</h3>
              <p className={styles.destInfo}>تورهای داخلی کیش</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>سفر بعدی خود را با تورینو شروع کنید</h2>
        <p>بهترین تورها و خدمات گردشگری در یک پلتفرم ساده</p>
        <button className={styles.ctaButton}>
          <Link href="/"> مشاهده تورها</Link>
         </button>
      </section>

    </div>
  );
}

