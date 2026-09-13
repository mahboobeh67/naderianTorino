// src/services/tourService.ts

import api from "../../core/config/api";
import { Tour } from "@/app/types/tour";

export interface TourQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "asc" | "desc";
  originId?: string | number;
  destinationId?: string | number;
  startDate?: string;
  endDate?: string;
}

export const tourService = {
  /**
   * دریافت لیست تمام تورها با امکان فیلتر و صفحه‌بندی
   */
  async getAll(params?: TourQueryParams): Promise<Tour[]> {
    const res = await api.get<Tour[]>("/tour", { params });
    return res.data;
  },

  /**
   * دریافت اطلاعات جزئیات یک تور بر اساس شناسه (ID)
   */
  async getById(id: string): Promise<Tour> {
    const res = await api.get<Tour>(`/tour/${id}`);
    return res.data;
  },
};






