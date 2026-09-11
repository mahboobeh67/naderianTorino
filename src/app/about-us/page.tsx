import Image from "next/image";
import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      {/* تیتر و بنر عنوان */}
      <div className={styles.headerWrapper}>
        <h1 className={styles.titleBanner}>
          <span className={styles.brandHighlight}>تورینو</span>
          ، همسفر هر سفر
        </h1>
      </div>

      {/* بخش محتوای اصلی */}
      <div className={styles.mainGrid}>
        {/* متن معرفی */}
        <div className={styles.textContent}>
          <p className={styles.paragraphPrimary}>
            فرقی ندارد مقصدتان کجاست؛ شما شایسته سفری آسان، مطمئن و باکیفیت
            هستید. تورینو به عنوان یکی از پیشگامان صنعت گردشگری کشور،
            تلاش می‌کند بهترین تجربه سفر را برای شما فراهم کند.
          </p>

          <p className={styles.paragraphSecondary}>
            از خرید بلیط هواپیما، قطار و اتوبوس گرفته تا رزرو هتل،
            تورهای داخلی و خارجی و خدمات اخذ ویزا، در تمام مراحل
            سفر همراه شما هستیم.
          </p>
        </div>

        {/* تصویر معرف */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about-us1.png"
            alt="درباره تورینو"
            width={500}
            height={500}
            priority
            className={styles.aboutImage}
          />
        </div>
      </div>

      {/* بخش سخن بنیان‌گذار */}
      <div className={styles.founderCard}>
        <h3 className={styles.founderName}>محبوبه نادریان</h3>

        <p className={styles.founderQuote}>
          «ما در تورینو متعهد هستیم تجربه سفر ایرانیان را با استفاده از
          نوآوری، تکنولوژی و خدمات حرفه‌ای متحول کنیم و سفر را
          ساده‌تر، امن‌تر و لذت‌بخش‌تر سازیم.»
        </p>
      </div>
    </section>
  );
}

export default AboutUs;

