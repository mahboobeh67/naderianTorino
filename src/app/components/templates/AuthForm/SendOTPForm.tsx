"use client";

import { FormEvent } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react"; // ایمپورت آیکون ضربدر
import { useSendOtp } from "../../../core/services/mutations";
import styles from "./style.module.css";

interface SendOTPFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  setStep: (step: number) => void;
  onClose?: () => void; // برای بستن مودال
}

function SendOTPForm({ mobile, setMobile, setStep, onClose }: SendOTPFormProps) {
  const { mutate, isPending } = useSendOtp();

  const sendOtpHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    if (!/^09\d{9}$/.test(mobile.replace(/\s|-/g, ""))) {
      toast.error("شماره موبایل معتبر نیست");
      return;
    }

    mutate(
      { mobile: mobile.replace(/\s|-/g, "") },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setStep(2);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div className={styles.form}>
      {/* دکمه بستن (ضربدر) */}
      {onClose && (
        <button 
          type="button" 
          onClick={onClose} 
          className={styles.closeButton}
          aria-label="بستن"
        >
          <X size={20} />
        </button>
      )}

      <h4 className={styles.title}>ورود به تورینو</h4>
      <p className={styles.subtitle}>شماره موبایل خود را وارد کنید</p>

      <form className={styles.formGroup} onSubmit={sendOtpHandler}>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="۰۹۱۲***۴۲۵۳"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className={styles.input}
          autoFocus
        />
        <button type="submit" disabled={isPending} className={styles.submitButton}>
          {isPending ? "در حال ارسال..." : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
