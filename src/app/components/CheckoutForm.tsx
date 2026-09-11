"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./Checkout.module.css";

// اسکیمای تعریف شده در Swagger
export interface OrderRequest {
  nationalCode: string;
  fullName: string;
  gender: "male" | "female";
  birthDate: string;
}

interface TourInfo {
  id: string;
  title: string;
  price: number;
  startDate?: string;
  endDate?: string;
}

interface CheckoutFormProps {
  tour: TourInfo;
  onSubmitOrder: (data: OrderRequest) => Promise<any>;
}

// تابع کمکی برای فرمت قیمت
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

// تابع محاسبه مدت اقامت (روز و شب)
const calculateDuration = (start?: string, end?: string): string => {
  if (!start || !end) return "۵ روز و ۴ شب"; // مقدار پیش‌فرض دیزاین
  try {
    const diff = Math.ceil(
      Math.abs(new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const days = diff > 0 ? diff + 1 : 1;
    const nights = days > 1 ? days - 1 : 0;
    const toFa = (n: number) =>
      new Intl.NumberFormat("fa-IR").format(n);
    return `${toFa(days)} روز و ${toFa(nights)} شب`;
  } catch {
    return "۵ روز و ۴ شب";
  }
};

export default function CheckoutForm({ tour, onSubmitOrder }: CheckoutFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState<OrderRequest>({
    fullName: "",
    nationalCode: "",
    birthDate: "",
    gender: "male",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderRequest, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderRequest, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی را وارد کنید";
    }

    if (!formData.nationalCode || !/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی ۱۰ رقمی معتبر نیست";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "تاریخ تولد الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderRequest]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsPending(true);
      await onSubmitOrder(formData);
      toast.success("خرید و رزرو با موفقیت انجام شد!");
      router.push("/profile/tours"); // یا مسیر تایید سفارش
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "خطایی در فرآیند ثبت رخ داد.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* ۱. کارت اطلاعات مسافر */}
        <section className={styles.passengerCard}>
          <div className={styles.cardHeader}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <h2>مشخصات مسافر</h2>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              
              {/* نام و نام خانوادگی */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="نام و نام خانوادگی"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              {/* کد ملی */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="nationalCode"
                  maxLength={10}
                  placeholder="کدملی"
                  value={formData.nationalCode}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.nationalCode && <span className={styles.errorText}>{errors.nationalCode}</span>}
              </div>

              {/* تاریخ تولد */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="birthDate"
                  placeholder="تاریخ تولد (مثلا: 1375/05/12)"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.birthDate && <span className={styles.errorText}>{errors.birthDate}</span>}
              </div>

              {/* جنسیت */}
              <div className={`${styles.inputGroup} ${styles.genderGroup}`}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
              </div>

            </div>
          </form>
        </section>

        {/* ۲. کارت خلاصه سفارش و قیمت نهایی */}
        <aside className={styles.summaryCard}>
          <div className={styles.tourHeader}>
            <h3 className={styles.tourTitle}>{tour?.title || "تور هولیر"}</h3>
            <span className={styles.duration}>
              {calculateDuration(tour?.startDate, tour?.endDate)}
            </span>
          </div>

          <hr className={styles.dashedDivider} />

          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>قیمت نهایی</span>
            <div className={styles.priceValue}>
              <span className={styles.amount}>{formatPrice(tour?.price || 17500000)}</span>
              <span className={styles.currency}>تومان</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isPending}
            className={styles.submitBtn}
          >
            {isPending ? "در حال ثبت خرید..." : "ثبت و خرید نهایی"}
          </button>
        </aside>

      </div>
    </div>
  );
}
