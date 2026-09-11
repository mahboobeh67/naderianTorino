"use client";

import Image from "next/image";
import Link from "next/link";
import AuthForm from "../templates/AuthForm/page"; 
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
     
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            src="/images/Torino.svg"
            alt="Torino Logo"
            width={146}
            height={44}
            priority
          />
        </Link>
      </div>

     
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={`${styles.navLink} ${styles.activeLink}`}>
              صفحه اصلی
            </Link>
          </li>
          <li>
            <Link href="/tourino-trips" className={styles.navLink}>
              خدمات گردشگری
            </Link>
          </li>
          <li>
            <Link href="/about-us" className={styles.navLink}>
              درباره ما
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className={styles.navLink}>
              تماس با ما
            </Link>
          </li>
        </ul>
      </nav>

    
      <div className={styles.authWrapper}>
        <AuthForm />
      </div>
    </header>
  );
}
