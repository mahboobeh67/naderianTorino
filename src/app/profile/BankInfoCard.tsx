"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { PenSquare } from "lucide-react";
import styles from "./Profile.module.css";
import { UserProfile } from "../core/services/profile.service";

interface BankFormData {
  cardNumber: string;
  iban: string;
  accountIdentifier?: string;
}

interface Props {
  profile: UserProfile;
  onUpdate: (payload: Partial<UserProfile>) => Promise<void>;
}

export default function BankInfoCard({
  profile,
  onUpdate,
}: Props): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // استخراج امن داده‌های بانکی از payment یا ریشه پروفایل
  const initialCardNumber =
    profile.payment?.debitCard_code ||
    (profile as unknown as Record<string, string>).cardNumber ||
    "";
  const initialIban =
    profile.payment?.shaba_code ||
    (profile as unknown as Record<string, string>).iban ||
    "";
  const initialAccount =
    profile.payment?.accountIdentifier ||
    (profile as unknown as Record<string, string>).accountIdentifier ||
    "";

  const [formData, setFormData] = useState<BankFormData>({
    cardNumber: initialCardNumber,
    iban: initialIban,
    accountIdentifier: initialAccount,
  });

  const handleOpen = (): void => {
    setFormData({
      cardNumber:
        profile.payment?.debitCard_code ||
        (profile as unknown as Record<string, string>).cardNumber ||
        "",
      iban:
        profile.payment?.shaba_code ||
        (profile as unknown as Record<string, string>).iban ||
        "",
      accountIdentifier:
        profile.payment?.accountIdentifier ||
        (profile as unknown as Record<string, string>).accountIdentifier ||
        "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // ارسال در قالب ساختار استاندارد payment به همراه فیلدهای سازگار
      await onUpdate({
        payment: {
          shaba_code: formData.iban,
          debitCard_code: formData.cardNumber,
          accountIdentifier: formData.accountIdentifier || "",
        },
      });
      setIsOpen(false);
    } catch (err: unknown) {
      console.error("خطا در به‌روزرسانی اطلاعات بانکی:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const displayCardNumber =
    profile.payment?.debitCard_code ||
    (profile as unknown as Record<string, string>).cardNumber ||
    "—";
  const displayIban =
    profile.payment?.shaba_code ||
    (profile as unknown as Record<string, string>).iban ||
    "—";

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
            <span className={styles.value}>{displayCardNumber}</span>
          </div>
          <div className={styles.dataField}>
            <span className={styles.label}>شماره شبا</span>
            <span className={styles.value}>{displayIban}</span>
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
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  className={styles.input}
                  placeholder="۶۰۳۷..."
                  maxLength={16}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>شماره شبا (IBAN)</label>
                <input
                  value={formData.iban}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setFormData({ ...formData, iban: e.target.value })
                  }
                  className={styles.input}
                  placeholder="IR..."
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={(): void => setIsOpen(false)}
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

