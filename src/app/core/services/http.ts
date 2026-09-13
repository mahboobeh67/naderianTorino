// src/app/core/services/httpService.ts

import QueryString from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// تایپ کوئری‌پارام‌ها
export type QueryParams = Record<string, any>;

/**
 * تابع اختصاصی فچ سمت سرور با قابلیت کش Next.js و تایپ جنریک
 * @template T نوع داده‌ای که انتظار داری از سرور برگرده
 */
const serverFetch = async <T = any>(
  endpoint: string,
  query?: QueryParams,
  options: RequestInit = { cache: "force-cache" }
): Promise<T | null> => {
  let url = BASE_URL;
  
  if (endpoint) {
    // جلوگیری از تکرار اسلش در آدرس
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    url += cleanEndpoint;
  }

  if (query && Object.keys(query).length > 0) {
    url += `?${QueryString.stringify(query)}`;
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      console.error(`ServerFetch Error [${res.status}]: ${res.statusText} -> ${url}`);
      return null;
    }

    const json: T = await res.json();
    return json;
  } catch (error) {
    console.error(`ServerFetch Network/Parse Error on [${url}]:`, error);
    return null;
  }
};

export { serverFetch };

