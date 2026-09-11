"use client";

import React, { useState } from "react";
import { PenSquare, Plus } from "lucide-react";
import styles from "./Profile.module.css";
import { UserProfile } from "../core/services/profile.service";

interface Props {
  profile: UserProfile;
  onUpdate: (payload: Partial<UserProfile>) => Promise<void>;
}

export default function AccountInfoCard({ profile, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(profile.email || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onUpdate({ email });
      setIsOpen(false);
    } catch (err) {
      // خطا در کامپوننت والد یا آلرت هندل می‌شود
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>اطلاعات حساب کاربری</span>
          <button
            type="button"
            onClick={() => {
              setEmail(profile.email || "");
              setIsOpen(true);
            }}
            className={styles.actionButton}
          >
            {profile.email ? (
              <>
                <PenSquare size={16} />
                <span>ویرایش اطلاعات</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>افزودن</span>
              </>
            )}
          </button>
        </div>

        <div className={styles.dataGrid}>
          <div className={styles.dataField}>
            <span className={styles.label}>شماره موبایل</span>
            <span className={styles.value}>{profile.mobile || "—"}</span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>ایمیل</span>
            <span className={styles.value}>{profile.email || "—"}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>ویرایش ایمیل</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>ایمیل</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="example@mail.com"
                  autoFocus
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.cancelBtn}
                  disabled={submitting}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.saveBtn}
                >
                  {submitting ? "در حال ثبت..." : "تایید و ذخیره"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
