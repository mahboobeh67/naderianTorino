"use client";

import { User, Plane, Search, FileText, CheckCircle, Wallet } from "lucide-react";
import styles from "./RefundGuide.module.css";

const steps = [
  {
    icon: User,
    title: "ورود به حساب کاربری",
    text: "وارد وب‌سایت تورینو شوید و روی آیکون حساب کاربری کلیک کنید. سپس شماره همراه خود را وارد کرده و وارد حساب کاربری شوید.",
  },
  {
    icon: Plane,
    title: "ورود به بخش سفرهای من",
    text: "پس از ورود، از بالای صفحه گزینه «سفرهای من» را انتخاب کنید تا لیست خریدها و سفرهای شما نمایش داده شود.",
  },
  {
    icon: Search,
    title: "پیدا کردن سفارش",
    text: "برای پیدا کردن سریع سفارش، شماره سفارش و تاریخ خرید بلیط را وارد کنید و سپس روی «جزئیات سفارش و استرداد» کلیک کنید.",
  },
  {
    icon: FileText,
    title: "انتخاب دلیل استرداد",
    text: "دلیل استرداد را انتخاب کنید. گزینه‌ها شامل لغو پرواز توسط ایرلاین، انصراف شخصی یا تغییر ساعت پرواز هستند.",
  },
  {
    icon: Wallet,
    title: "ثبت درخواست استرداد",
    text: "نحوه دریافت مبلغ را مشاهده کنید و روی «تایید و ثبت درخواست» بزنید. مبلغ استرداد به اعتبار حساب کاربری شما در تورینو برمی‌گردد.",
  },
  {
    icon: CheckCircle,
    title: "پیگیری استرداد",
    text: "پس از ثبت درخواست، پیام موفقیت نمایش داده می‌شود. نتیجه را می‌توانید در بخش «سفرهای من» و قسمت «پیگیری استرداد» مشاهده کنید.",
  },
];

export default function RefundGuide() {
  return (
    <div className={styles.container}>
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <div key={index} className={styles.stepCard}>
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} size={22} />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                {index + 1}. {step.title}
              </h3>

              <p className={styles.description}>
                {step.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
