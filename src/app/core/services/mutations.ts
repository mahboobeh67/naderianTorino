import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../config/api";
import { setCookie } from "../utils/cookie";

// اینترفیس‌های داده‌های ورودی (Payloads)
export interface SendOtpPayload {
  mobile: string;
}

export interface CheckOtpPayload {
  mobile: string;
  code: string;
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  message?: string;
  user?: {
    id: string;
    mobile: string;
  };
}

export interface CheckoutPayload {
  [key: string]: any; // یا فیلدهای مشخص شده طبق الگوی سفارشتان
}

// 1. هوک ارسال کد تأیید
export const useSendOtp = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  SendOtpPayload
> => {
  const mutationFn = (data: SendOtpPayload) => api.post("/auth/send-otp", data);

  return useMutation({ mutationFn });
};

// 2. هوک بررسی کد تأیید و ذخیره توکن
export const useCheckOtp = (): UseMutationResult<
  AxiosResponse<AuthResponseData>,
  unknown,
  CheckOtpPayload
> => {
  const queryClient = useQueryClient();

  const mutationFn = (data: CheckOtpPayload) =>
    api.post<AuthResponseData>("/auth/check-otp", data);

  const onSuccess = (data: AxiosResponse<AuthResponseData>) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

// 3. هوک افزودن به سبد خرید
export const useAddToBasket = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  string | number
> => {
  const mutationFn = (id: string | number) => api.put(`/basket/${id}`);

  return useMutation({ mutationFn });
};

// 4. هوک ثبت سفارش / تسویه حساب
export const useCheckout = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  CheckoutPayload
> => {
  const mutationFn = (data: CheckoutPayload) => api.post("/order", data);

  return useMutation({ mutationFn });
};
