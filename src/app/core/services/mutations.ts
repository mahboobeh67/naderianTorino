import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";
import { setCookie } from "../utils/cookie";

// --- تعریف اینترفیس‌ها (قراردادها) ---
interface SendOtpPayload {
  mobile: string;
}

interface CheckOtpPayload {
  mobile: string;
  code: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface CheckoutPayload {
  [key: string]: any; // یا بهتره دقيقاً فیلدهای سبد خرید رو اینجا بنویسی
}

// --- توابع اصلاح شده ---

export const useSendOtp = () => {
  // اینجا به `data` تایپ SendOtpPayload دادیم
  const mutationFn = (data: SendOtpPayload) => api.post("/auth/send-otp", data);

  return useMutation({ mutationFn });
};

export const useCheckOtp = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data: CheckOtpPayload) => api.post("/auth/check-otp", data);

  // در اینجا هم داده برگشتی از سرور رو تایپ می‌کنیم
  const onSuccess = (response: { data: AuthResponse }) => {
    setCookie("accessToken", response?.data?.accessToken, 30);
    setCookie("refreshToken", response?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const useAddToBasket = () => {
  // ID معمولاً string هست (برای اسلاگ) یا number
  const mutationFn = (id: string) => api.put(`/basket/${id}`);

  return useMutation({ mutationFn });
};

export const useCheckout = () => {
  const mutationFn = (data: CheckoutPayload) => api.post("/order", data);

  return useMutation({ mutationFn });
};
