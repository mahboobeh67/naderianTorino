"use client";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Image from "next/image";
import styles from "./JalaliDatePicker.module.css";

interface JalaliDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
}

export default function JalaliDatePicker({
  value,
  onChange,
  placeholder = "تاریخ تولد",
  error,
}: JalaliDatePickerProps) {
  const handleDateChange = (date: DateObject | null) => {
    if (!date) {
      onChange("");
      return;
    }
    // فرمت استاندارد شمسی: YYYY/MM/DD
    onChange(date.format("YYYY/MM/DD"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          value={value}
          onChange={handleDateChange}
          placeholder={placeholder}
          inputClass={styles.dateInput}
          containerClassName={styles.pickerContainer}
        />
        <Image
          src="/images/calendar.png"
          width={20}
          height={20}
          alt="تقویم"
          className={styles.calendarIcon}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
