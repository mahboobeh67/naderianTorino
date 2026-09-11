"use client";

import AuthProvider from "../components/partials/providers/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Layout.module.css";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

// لیست آیتم‌های منو برای تمیزتر شدن کد و جلوگیری از تکرار (DRY)
const MENU_ITEMS = [
  {
    href: "/profile",
    title: "پروفایل",
    icon: "/images/profile3.svg",
    exact: true,
  },
  {
    href: "/profile/my-tours",
    title: "تورهای من",
    icon: "/images/sun-fog.svg",
  },
  {
    href: "/profile/transactions",
    title: "تراکنش‌ها",
    icon: "/images/convert-card.svg",
  },
];

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav aria-label="منوی پروفایل">
            <ul className={styles.menu}>
              {MENU_ITEMS.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <li key={item.href} className={styles.menuItem}>
                    <Link
                      href={item.href}
                      className={`${styles.menuLink} ${
                        isActive ? styles.active : ""
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className={styles.menuIcon}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className={styles.content}>{children}</main>
      </div>
    </AuthProvider>
  );
}

