"use client";

import { useRouter } from "next/navigation";
import { Phone, Send, X } from "lucide-react";
import styles from "./SupportBox.module.css";

export default function SupportBox() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // عملکرد ارسال فرم
  };

  return (
    <div className={styles.cardContainer}>
      {/* Title */}
      <h1 className={styles.headerTitle}>
        مرکز پشتیبانی آنلاین تورینو
      </h1>

      <p className={styles.description}>
        چطور می‌توانیم کمکتان کنیم؟ لطفاً اطلاعات تماس و پیام خود را وارد کنید تا تیم پشتیبانی در سریع‌ترین زمان با شما ارتباط بگیرد.
      </p>

      <form className={styles.formBody} onSubmit={handleSubmit}>
        {/* Contact Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            ایمیل یا شماره تماس
          </label>

          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <Phone size={18} />
            </span>

            <input
              type="text"
              placeholder="مثلاً 09123456789 یا example@email.com"
              className={styles.inputField}
            />
          </div>
        </div>

        {/* Message Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            متن پیام
          </label>

          <textarea
            rows={5}
            placeholder="مشکل یا درخواست خود را بنویسید..."
            className={styles.textareaField}
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={() => router.push("/")}
            className={styles.cancelButton}
          >
            <X size={16} />
            انصراف
          </button>

          <button
            type="submit"
            className={styles.submitButton}
          >
            <Send size={16} />
            ارسال پیام
          </button>
        </div>
      </form>
    </div>
  );
}
