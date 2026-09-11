"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FaUser, FaAngleDown } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import styles from "./UserDropdown.module.css";

interface UserDropdownProps {
  mobile: string;
}

export default function UserDropdown({ mobile }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // بستن منو با کلیک در هر نقطه خارج از دراپ‌داون
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);

    // ۱. پاک کردن لوکال استوریج و سشن استوریج
    localStorage.clear();
    sessionStorage.clear();

    // ۲. پاک کردن تمام کوکی‌های محتمل (accessToken, refreshToken, token)
    const cookiesToClear = ["accessToken", "refreshToken", "token"];
    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });

    // ۳. پاک کردن کش ری‌اکت‌کوئری تا بلافاصله دیتای یوزر نال بشه
    queryClient.clear();

    // ۴. هدایت به صفحه اصلی و رفرش
    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {/* دکمه هدر */}
      <button
        type="button"
        className={styles.triggerButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaAngleDown
          className={`${styles.arrowIcon} ${isOpen ? styles.arrowOpen : ""}`}
        />
        <span className={styles.userPhone}>{mobile}</span>
        <div className={styles.iconCircle}>
          <FaUser className={styles.userIcon} />
        </div>
      </button>

      {/* منوی بازشونده */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {/* هدر خاکستری منو با شماره موبایل */}
          <div className={styles.dropdownHeader}>
            <div className={styles.headerIconWrapper}>
              <FaUser />
            </div>
            <span className={styles.headerPhone}>{mobile}</span>
          </div>

          {/* آیتم‌ها */}
          <div className={styles.menuList}>
            <Link
              href="/profile"
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <FaUser className={styles.itemIcon} />
              <span>اطلاعات حساب کاربری</span>
            </Link>

            <button
              type="button"
              className={styles.logoutItem}
              onClick={handleLogout}
            >
              <LuLogOut className={styles.logoutIcon} />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
