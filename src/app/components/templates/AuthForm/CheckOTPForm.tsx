"use client";

import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useCheckOtp } from "../../../core/services/mutations";
import styles from "./style.module.css";

const OTP_LENGTH = 6; // ⬅️ تغییر به ۶ رقم
const RESEND_SECONDS = 90; // ۱ دقیقه و ۳۰ ثانیه

interface CheckOTPFormProps {
  mobile: string;
  setStep: (step: number) => void;
  setIsOpen?: (open: boolean) => void;
}

function CheckOTPForm({ mobile, setStep, setIsOpen }: CheckOTPFormProps) {
  // آرایه ۶ تایی برای ارقام
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_SECONDS);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate, isPending } = useCheckOtp();

  // ⏱ تایمر ۹۰ ثانیه‌ای
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    // دریافت فقط یک رقم عددی
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // پرش به باکس بعدی از چپ به راست
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // بازگشت و پاک کردن باکس قبلی
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const checkOtpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("لطفاً کد تایید ۶ رقمی را کامل وارد کنید");
      return;
    }
    if (isPending) return;

    mutate(
      { mobile, code },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "خوش آمدید! 🎉");
          if (setIsOpen) setIsOpen(false);
          setStep(1);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "کد وارد شده اشتباه است");
          console.error(error);
        },
      },
    );
  };

  return (
    <div className={styles.form}>
      {/* دکمه بازگشت به مرحله شماره تماس (بالا سمت چپ بر اساس RTL) */}
      <button
        type="button"
        className={styles.backButton}
        onClick={() => setStep(1)}
        aria-label="بازگشت"
      >
        ←
      </button>

      <h4 className={styles.title}>کد تایید را وارد کنید</h4>
      <p className={styles.subtitle}>
        کد تایید به شماره <span className={styles.mobile}>{mobile}</span> ارسال شد
      </p>

      <form onSubmit={checkOtpHandler}>
        {/* کانتینر ۶ تایی از چپ به راست */}
        <div className={styles.otpContainer} dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={styles.otpInput}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* بخش تایمر / ارسال مجدد */}
        <div className={styles.timerRow}>
          {timeLeft > 0 ? (
            <span className={styles.timer}>
              <span>{formatTime(timeLeft)}</span> تا ارسال مجدد کد
            </span>
          ) : (
            <button
              type="button"
              className={styles.resendButton}
              onClick={() => {
                setTimeLeft(RESEND_SECONDS);
                // اینجا می‌تونی تابع ارسال مجدد useSendOtp رو هم صدا بزنی
              }}
            >
              ارسال مجدد کد تایید
            </button>
          )}
        </div>

        <button type="submit" disabled={isPending} className={styles.submitButton}>
          {isPending ? "در حال ورود..." : "ورود به تورینو"}
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;

