import api from "";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    mobile: string;
  };
}
export const authService = {
  sendOtp(mobile: string) {
    return api.post("/auth/send-otp", { mobile });
  },
  verifyOtp(mobile: string, otp: string) {
    return api.post<AuthResponse>("/auth/check-otp", {
      mobile,
      code:otp,
    });
  },

  refresh(refreshToken : string){
    return api.post<AuthResponse>("/auth/refresh-token", {
       refreshToken,
    })
  }
};
