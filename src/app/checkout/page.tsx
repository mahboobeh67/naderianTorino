"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCheckout } from "../core/services/mutations";
import { useGetBasket } from "../core/services/queries";
import styles from "./Checkout.module.css";
import Image from "next/image";
import JalaliDatePicker from "../components/module/JalaliDatePicker";

// اسکیمای تعریف شده در Swagger
export interface OrderRequest {
  nationalCode: string;
  fullName: string;
  gender: "male" | "female";
  birthDate: string;
}

// تابع کمکی فرمت قیمت به تومان با اعداد فارسی
const formatPrice = (price?: number): string => {
  if (!price) return "۰";
  return new Intl.NumberFormat("fa-IR").format(price);
};

// تابع محاسبه مدت زمان اقامت (روز و شب)
const calculateDuration = (start?: string, end?: string): string => {
  if (!start || !end) return "۵ روز و ۴ شب";
  try {
    const diff = Math.ceil(
      Math.abs(new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const days = diff > 0 ? diff + 1 : 1;
    const nights = days > 1 ? days - 1 : 0;
    const toFa = (n: number) => new Intl.NumberFormat("fa-IR").format(n);
    return `${toFa(days)} روز و ${toFa(nights)} شب`;
  } catch {
    return "۵ روز و ۴ شب";
  }
};

export default function CheckoutPage() {
  const { data: basketResponse, isLoading } = useGetBasket();
  const { isPending, mutate } = useCheckout();
  const router = useRouter();

  const tour = basketResponse?.data;

  // استیت فرم مشخصات مسافر
  const [formData, setFormData] = useState<OrderRequest>({
    fullName: "",
    nationalCode: "",
    gender: "male",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderRequest, string>>>({});

  // اعتبارسنجی ورودی‌ها
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderRequest, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی را وارد کنید";
    }
    if (!formData.nationalCode || !/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی ۱۰ رقمی معتبر نیست";
    }
    if (!formData.birthDate.trim()) {
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

  const checkoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isPending) return;

    mutate(formData, {
      onSuccess: (res: any) => {
        toast.success(res?.data?.message || "سفارش با موفقیت ثبت شد");
        // در صورت وجود درگاه پرداخت:
        // if (res?.data?.link) location.href = res.data.link;
        router.push("/payment?status=success");
      },
      onError: (err: any) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "خطا در ثبت نهایی، دوباره تلاش کنید.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", color: "#64748b", margin: "60px 0" }}>
          در حال بارگذاری اطلاعات سبد خرید... ⏳
        </p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", color: "#ef4444", margin: "60px 0" }}>
          سبد خرید شما خالی است! لطفاً ابتدا یک تور انتخاب کنید.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* ۱. کارت اطلاعات و فرم مسافر (سمت راست) */}
        <section className={styles.passengerCard}>
          <div className={styles.cardHeader}>
           <Image src="/images/profile3.svg" width={20} height={20} alt="" />
            <h2>مشخصات مسافر</h2>
          </div>

          <form id="checkout-form" onSubmit={checkoutHandler}>
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
 <div className={styles.inputGroup}>
  <JalaliDatePicker
    value={formData.birthDate}
    onChange={(date) => {
      setFormData((prev) => ({ ...prev, birthDate: date }));
      if (errors.birthDate) {
        setErrors((prev) => ({ ...prev, birthDate: "" }));
      }
    }}
    placeholder="تاریخ تولد"
    error={errors.birthDate}
  />
</div>
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

        {/* ۲. کارت خلاصه سفارش و قیمت نهایی (سمت چپ) */}
        <aside className={styles.summaryCard}>
          <div className={styles.tourHeader}>
            <h3 className={styles.tourTitle}>{tour.title}</h3>
            <span className={styles.duration}>
              {calculateDuration(tour.startDate, tour.endDate)}
            </span>
          </div>

          <hr className={styles.dashedDivider} />

          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>قیمت نهایی</span>
            <div className={styles.priceValue}>
              <span className={styles.amount}>{formatPrice(tour.price)}</span>
              <span className={styles.currency}>تومان</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isPending}
            className={styles.submitBtn}
          >
            {isPending ? "در حال انتقال به درگاه..." : "ثبت و خرید نهایی"}
          </button>
        </aside>

      </div>
    </div>
  );
}

