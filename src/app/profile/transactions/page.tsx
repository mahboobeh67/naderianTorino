"use client";


import { useGetTransactions } from "../../core/services/queries";
import styles from "./Transactions.module.css";

const fa = new Intl.NumberFormat("fa-IR");

// تبدیل تاریخ و ساعت به فرمت دقیق فیگما: «۱۴۰۲/۱۰/۱۲ - ۱۴:۲۴»
const formatPersianDateTime = (dateStr?: string): string => {
  if (!dateStr) return "---";
  try {
    const d = new Date(dateStr);
    const datePart = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);

    const timePart = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);

    // طبق ترتیب فیگما: تاریخ - ساعت
    return `${datePart} - ${timePart}`;
  } catch {
    return dateStr;
  }
};

// فرمت‌دهی هوشمند شماره سفارش
const formatOrderNumber = (code: any): string => {
  if (!code && code !== 0) return "---";
  if (typeof code === "number" || (!isNaN(Number(code)) && String(code).trim() !== "")) {
    return fa.format(Number(code));
  }
  const digits = String(code).replace(/\D/g, "");
  const shortCode = digits.slice(-8) || String(code).slice(0, 8);
  return !isNaN(Number(shortCode)) ? fa.format(Number(shortCode)) : String(code);
};

function TransactionsPage() {
  const { data, isLoading, isError } = useGetTransactions();

  // نرمال‌سازی دیتا از اندپوینت
  const transactions = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  if (isLoading) {
    return (
      <div className={styles.centerBox}>
        <div className={styles.spinner} />
        <p>در حال بارگذاری تراکنش‌ها... ⏳</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.centerBox}>
        <p className={styles.errorText}>خطا در دریافت لیست تراکنش‌ها! ❌</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className={styles.centerBox}>
        <p className={styles.emptyText}>هیچ تراکنشی یافت نشد! 💳</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th>تاریخ و ساعت</th>
            <th>مبلغ(تومان)</th>
            <th>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item: any, index: number) => {
            const date = item?.createdAt || item?.date || item?.tour?.startDate;
            const amount = item?.amount || item?.totalPrice || item?.price || 0;
            const orderId = item?.orderId || item?.orderNumber || item?.id;

            return (
              <tr key={item?.id || index} className={styles.bodyRow}>
                <td className={styles.dateCell}>{formatPersianDateTime(date)}</td>
                <td className={styles.amountCell}>{fa.format(amount)}</td>
                {/* دقیقاً مطابق فیگما: ثبت نام در تور گردشگری */}
                <td className={styles.typeCell}>ثبت نام در تور گردشگری</td>
                <td className={styles.orderCell}>سفارش {formatOrderNumber(orderId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;

