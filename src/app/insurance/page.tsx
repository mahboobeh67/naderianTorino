import Image from "next/image";
import {
  Stethoscope,
  Briefcase,
  Scale,
  Plane,
  Undo2,
  Ban,
  Banknote,
  Shield
} from "lucide-react";
import styles from "./Insurance.module.css";

export default function Insurance() {
  const services = [
    { title: "فوریت پزشکی", icon: <Stethoscope size={22} /> },
    { title: "بیمه اموال", icon: <Shield size={22} /> },
    { title: "مفقودی چمدان", icon: <Briefcase size={22} /> },
    { title: "مشاور حقوقی", icon: <Scale size={22} /> },
    { title: "اورژانس هوایی", icon: <Plane size={22} /> },
    { title: "وقفه سفر", icon: <Undo2 size={22} /> },
    { title: "کنسلی سفر", icon: <Ban size={22} /> },
    { title: "هزینه بازگشت غیرمنتظره", icon: <Banknote size={22} /> },
  ];

  return (
    <section className={styles.insuranceSection}>
      {/* عنوان و پیام معرفی */}
      <div className={styles.headerWrapper}>
        <h1 className={styles.mainTitle}>
          خرید بیمه مسافرتی
        </h1>

        <p className={styles.bannerNotice}>
          بیمه مسافرتی یکی از مهم‌ترین خدمات برای سفرهای خارجی است و در بسیاری
          از موارد مانند دریافت ویزای شینگن ضروری می‌باشد.
        </p>
      </div>

      {/* بخش دو ستونه خدمات و تصویر */}
      <div className={styles.contentGrid}>
        <div>
          <h2 className={styles.servicesTitle}>
            خدمات بیمه مسافرتی
          </h2>

          <div className={styles.servicesWrapper}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <span className={styles.iconWrapper}>
                  {service.icon}
                </span>

                <span className={styles.serviceText}>
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/bimeh.png"
            width={400}
            height={400}
            alt="بیمه مسافرتی"
            className={styles.insuranceImg}
            priority
          />
        </div>
      </div>

      {/* دکمه خرید */}
      <div className={styles.ctaWrapper}>
        <button type="button" className={styles.purchaseBtn}>
          خرید بیمه مسافرتی
        </button>
      </div>
    </section>
  );
}


