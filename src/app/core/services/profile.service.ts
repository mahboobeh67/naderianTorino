import api from "../config/api";
export interface UserProfile {
  id: string;
  mobile: string;
  email?: string; // ایمیل ممکنه null باشه
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: "male" | "female" | "other";
  cardNumber?: string;
  iban?: string;
  nationalCode?: string; // کد ملی
}

export default function getToken() {
  return localStorage.getItem("token");
}
export const getProfile = async () : Promise<UserProfile > => {
  const {data} = await api.get("/user/profile")
  return data;
}

export const updateProfile = async (payload: any) => {

  const {data} = await api.put(`/user/profile`, payload);
  return data
}
