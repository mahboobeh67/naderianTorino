// src/utils/cookie.ts

/**
 * تنظیم کوکی با تایپ‌های مشخص
 * @param name - نام کوکی
 * @param value - مقدار کوکی
 * @param days - تعداد روزهای اعتبار
 */
export function setCookie(name: string, value: string, days: number): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * دریافت مقدار کوکی بر اساس نام
 * @param name - نام کوکی برای جستجو
 * @returns مقدار کوکی یا undefined اگر پیدا نشد
 */
export function getCookie(name: string): string | undefined {
  // استفاده از ? اختیاری (Optional Chaining) برای امنیت بیشتر در SSR
  const value = `; ${document?.cookie || ""}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(";")?.shift();
  }
  
  return undefined;
}
