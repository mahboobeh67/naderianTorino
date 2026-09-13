import { useRouter, useSearchParams } from "next/navigation";

// تعریف اینترفیس خروجی هوک برای شفافیت کامل
interface UseQueryReturn {
  addQuery: (key: string, value: string | number | boolean) => void;
  removeQuery: (key: string) => void;
  getQuery: (key: string) => string | null;
}

const useQuery = (): UseQueryReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(String(searchParams));

  const addQuery = (key: string, value: string | number | boolean): void => {
    value = String(value);
    params.set(key, value);
    router.replace(`?${params}`);
  };

  const removeQuery = (key: string): void => {
    params.delete(key);
    router.replace(`?${params}`);
  };

  const getQuery = (key: string): string | null => {
    return params.get(key);
  };

  return { addQuery, removeQuery, getQuery };
};

export default useQuery;

