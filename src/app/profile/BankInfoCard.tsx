"use client";

import React, { useState } from "react";
import { PenSquare } from "lucide-react";
import styles from "./Profile.module.css";
import { UserProfile } from "../core/services/profile.service";

interface Props {
  profile: UserProfile;
  onUpdate: (payload: Partial<UserProfile>) => Promise<void>;
}

export default function BankInfoCard({ profile, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: profile.cardNumber || "",
    iban: profile.iban || "",
  });

  const handleOpen = () => {
    setFormData({
      cardNumber: profile.cardNumber || "",
      iban: profile.iban || "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onUpdate(formData);
      setIsOpen(false);
    } catch (err) {
      // هندلینگ خطا
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>اطلاعات حساب بانکی</span>
          <button
            type="button"
            onClick={handleOpen}
            className={styles.actionButton}
          >
            <PenSquare size={16} />
            <span>ویرایش اطلاعات</span>
          </button>
        </div>

        <div className={styles.dataGrid}>
          <div className={styles.dataField}>
            <span className={styles.label}>شماره کارت</span>
            <span className={styles.value}>{profile.cardNumber || "—"}</span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>شماره شبا</span>
            <span className={styles.value}>{profile.iban || "—"}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>ویرایش اطلاعات بانکی</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>شماره کارت</label>
                <input
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className={styles.input}
                  placeholder="۶۰۳۷..."
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>شماره شبا (IBAN)</label>
                <input
                  value={formData.iban}
                  onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  className={styles.input}
                  placeholder="IR..."
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
