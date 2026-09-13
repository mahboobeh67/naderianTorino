// src/app/core/utils/helper.ts

// یک تایپ جنریک و منعطف برای آبجکت‌های تودرتو
export type NestedObject = {
  [key: string]: any;
};

// خروجی یک آبجکت تخت با کلیدهای متنی است
export type FlattenedObject = Record<string, any>;

/**
 * تبدیل آبجکت‌های تودرتو به یک آبجکت تک‌سطحی (Flat)
 * @param obj - آبجکت ورودی
 * @param delimiter - جداکننده کلیدها (پیش‌فرض: '.')
 * @param prefix - پیشوند کلیدها (برای فراخوانی بازگشتی)
 */
const flattenObject = (
  obj: NestedObject,
  delimiter: string = ".",
  prefix: string = ""
): FlattenedObject => {
  if (!obj || typeof obj !== "object") return {};

  const flattObject = Object.keys(obj).reduce<FlattenedObject>((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    const currentKey = `${pre}${k}`;

    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k]) &&
      Object.keys(obj[k]).length > 0
    ) {
      Object.assign(acc, flattenObject(obj[k], delimiter, currentKey));
    } else {
      acc[currentKey] = obj[k];
    }
    return acc;
  }, {});

  return flattObject;
};

export { flattenObject };

