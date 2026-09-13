import api from "../config/api";
import type { AxiosResponse } from "axios";

export interface UserPaymentInfo {
  shaba_code?: string;
  debitCard_code?: string;
  accountIdentifier?: string;
}

export interface UserProfile {
  id: string;
  mobile: string;
  email?: string | null; // ایمیل ممکنه null باشه
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: "male" | "female";
  nationalCode?: string; // کد ملی
  payment?: UserPaymentInfo;
}

export default function getToken(): string | null {
  return localStorage.getItem("token");
}

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get<UserProfile>("/user/profile");
  return data;
};

export const updateProfile = async (
  payload: Partial<UserProfile>,
): Promise<UserProfile> => {
  const { data } = await api.put<UserProfile, AxiosResponse<UserProfile>, Partial<UserProfile>>(
    `/user/profile`,
    payload,
  );
  return data;
};




