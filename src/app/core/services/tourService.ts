import api from "../../core/config/api";
import { Tour } from "../../../types/tour";

export interface TourQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "asc" | "desc";
}
export const tourService = {

  async getAll(params: TourQueryParams): Promise<Tour[]> {
    const res = await api.get("/tour", {params});
    return res.data;
  },

  async getById(id: string): Promise<Tour> {
    const res = await api.get(`/tour/${id}`);
     console.log("response:", res.data)
    return res.data;
  }

};

console.log("BASE_URL:", api.defaults.baseURL);






