"use client";

import React, { useState } from "react";
import { PenSquare } from "lucide-react";
import styles from "./Profile.module.css";
import { UserProfile } from "../core/services/profile.service";

interface Props {
  profile: UserProfile;
  onUpdate: (payload: Partial<UserProfile>) => Promise<void>;
}

export default function PersonalInfoCard({ profile, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    nationalCode: profile.nationalCode || "",
    gender: profile.gender || "",
    birthDate: profile.birthDate || "",
  });

  const handleOpen = () => {
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      nationalCode: profile.nationalCode || "",
      gender: profile.gender || "",
      birthDate: profile.birthDate || "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onUpdate(formData as Partial<UserProfile>);
      setIsOpen(false);
    } catch (err) {
      // هندلینگ خطا
    } finally {
      setSubmitting(false);
    }
  };

  const renderGender = (gender?: string) => {
    if (gender === "female") return "زن";
    if (gender === "male") return "مرد";
    if (gender === "other") return "سایر";
    return "—";
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>اطلاعات شخصی</span>
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
            <span className={styles.label}>نام و نام خانوادگی</span>
            <span className={styles.value}>
              {profile.firstName || profile.lastName
                ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
                : "—"}
            </span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>کدملی</span>
            <span className={styles.value}>{profile.nationalCode || "—"}</span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>جنسیت</span>
            <span className={styles.value}>{renderGender(profile.gender)}</span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>تاریخ تولد</span>
            <span className={styles.value}>{profile.birthDate || "—"}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>ویرایش اطلاعات شخصی</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>نام</label>
                <input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={styles.input}
                  placeholder="نام"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>نام خانوادگی</label>
                <input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={styles.input}
                  placeholder="نام خانوادگی"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>کد ملی</label>
                <input
                  value={formData.nationalCode}
                  onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
                  className={styles.input}
                  placeholder="کد ملی ۱۰ رقمی"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>جنسیت</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className={styles.input}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="female">زن</option>
                  <option value="male">مرد</option>
                  <option value="other">سایر</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>تاریخ تولد</label>
                <input
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className={styles.input}
                  placeholder="مثال: ۱۳۸۳/۱۰/۱۷"
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
