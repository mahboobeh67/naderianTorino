// src/hooks/useQuery.ts
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ایجاد یک تابع برای تولید کوئری استرینگ جدید
  // استفاده از useCallback برای جلوگیری از رندر مجدد غیرضروری
  const addQuery = useCallback((key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    
    // استفاده از replace برای جلوگیری از پر شدن History مرورگر در حین فیلتر کردن
    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  const removeQuery = useCallback((key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    
    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  const getQuery = useCallback((key: string): string | null => {
    return searchParams.get(key);
  }, [searchParams]);

  return { addQuery, removeQuery, getQuery };
};

