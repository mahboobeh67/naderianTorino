import api from "../config/api"; // یا مسیر دقیق فایل api خودتون
import { AxiosResponse } from "axios";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    mobile: string;
  };
}

export interface SendOtpResponse {
  message?: string;
  code?: string;
}

export const authService = {
  sendOtp(mobile: string): Promise<AxiosResponse<SendOtpResponse>> {
    return api.post<SendOtpResponse>("/auth/send-otp", { mobile });
  },

  verifyOtp(mobile: string, otp: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/auth/check-otp", {
      mobile,
      code: otp,
    });
  },

  refresh(refreshToken: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/auth/refresh-token", {
      refreshToken,
    });
  },
};

