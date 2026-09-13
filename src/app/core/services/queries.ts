// src/app/core/services/queries.ts
import { useQuery } from "@tanstack/react-query";
import QueryString from "qs";
import api from "../config/api";
import { Tour } from "../../types/tour"; 

export interface TourFilterQuery {
  originId?: string;
  destinationId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  sort?: "price" | "date";
  [key: string]: string | number | undefined; // ایندکس‌سینچر امن برای فیلدهای اضافه
}

export const useGetUserData = () => {
  const queryFn = async () => {
    const res = await api.get("/user/profile");
    return res.data;
  };
  const queryKey = ["user-data"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (query?: TourFilterQuery) => {
  const queryFn = async () => {
    const url = query && Object.keys(query).length > 0 
      ? `/tour?${QueryString.stringify(query)}` 
      : "/tour";
    const res = await api.get<Tour[]>(url);
    return res.data;
  };
  
  const queryKey = ["tour", query];

  return useQuery({ 
    queryFn, 
    queryKey, 
    enabled: true 
  });
};

export const useGetBasket = () => {
  const queryFn = async () => {
    const res = await api.get("/basket");
    return res.data;
  };
  const queryKey = ["user-basket"];

  return useQuery({ queryFn, queryKey });
};

export const useGetUserTours = () => {
  const queryFn = async () => {
    const res = await api.get("/user/tours");
    return res.data;
  };
  const queryKey = ["user-tours"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTransactions = () => {
  const queryFn = async () => {
    const res = await api.get("/user/transactions");
    return res.data;
  };
  const queryKey = ["user-transactions"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTourImages = () => {
  const queryFn = async () => {
    const res = await api.get<Tour[]>("/tour");
    return res.data;
  };
  const queryKey = ["tour-images"];

  return useQuery({ queryFn, queryKey });
};
