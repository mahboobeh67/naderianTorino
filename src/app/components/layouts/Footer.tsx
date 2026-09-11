import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInner}>
            <nav className={styles.footerNav}>
              <h4>تورینو</h4>
              <ul>
                <li>
                  <Link href="/about-us">درباره ما</Link>
                </li>
                <li>
                  <Link href="/contact-us">تماس با ما</Link>
                </li>
                <li>
                  <Link href="/why-torino">چرا تورینو</Link>
                </li>
                <li>
                  <Link href="/insurance">بیمه مسافرتی</Link>
                </li>
              </ul>
            </nav>
            <nav className={styles.footerNav}>
              <h4>خدمات مشتریان</h4>
              <ul>
                <li>
                  <Link href="/help-center">پشتیبانی آنلاین</Link>
                </li>
                <li>
                  <Link href="/help/buy-ticket">راهنمای خرید</Link>
                </li>
                <li>
                  <Link href="/refund-process">راهنمای استرداد</Link>
                </li>
                <li>
                  <Link href="/fqa">پرسش و پاسخ</Link>
                </li>
              </ul>
            </nav>
            <div className={styles.footerBrand}>
              <div className={styles.torinoFooterLogo}>
                <Image
                  src="/images/torino.svg"
                  width={144}
                  height={85}
                  // className="w-6"
                  alt="تورینو"
                />
                <p>
                  تلفن پشتیبانی: <span>021-8574</span>
                </p>
              </div>

              <div className={styles.standards}>
                <Image
                  src="/images/1.png"
                  alt=""
                  width={74}
                  height={68}
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src="/images/2.png"
                  alt=""
                  width={74}
                  height={68}
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src="/images/3.jpg"
                  alt=""
                  width={74}
                  height={68}
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src="/images/4.svg"
                  alt=""
                  width={74}
                  height={68}
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src="/images/5.svg"
                  alt=""
                  width={74}
                  height={68}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <p className={styles.copyRight}>
        © {new Date().getFullYear()} | تورینو - کلیه حقوق محفوظ است
      </p>
    </>
  );
}

export default Footer;