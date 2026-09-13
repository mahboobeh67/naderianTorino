import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie } from "../utils/cookie";

// ساختار سفارشی برای ریکوئست‌هایی که ریترای می‌شوند
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ساختار پاسخ ریفرش توکن
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

// ساختار خروجی تابع getNewTokens
interface GetNewTokensResult {
  response?: AxiosResponse<RefreshTokenResponse>;
  error?: unknown;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await getNewTokens();
      if (res?.response?.status === 200) {
        setCookie("accessToken", res?.response?.data?.accessToken, 30);
        return api(originalRequest);
      } else {
        setCookie("accessToken", "", 0);
        setCookie("refreshToken", "", 0);
      }
    }

    return Promise.reject(error.response?.data);
  },
);

export default api;

const getNewTokens = async (): Promise<GetNewTokensResult | undefined> => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      {
        refreshToken,
      },
    );
    return { response };
  } catch (error) {
    return { error };
  }
};

