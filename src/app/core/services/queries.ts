import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import api from "../config/api";
import QueryString from "qs";

// اگر تایپ UserProfile را جای دیگری داری، همین import کن
// import type { UserProfile } from "../services/profile.service";

type ToursQuery = Record<string, unknown> | undefined;

export const useGetUserData = (): UseQueryResult<AxiosResponse<any>, unknown> => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"] as const;

  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (
  query: ToursQuery,
): UseQueryResult<AxiosResponse<any>, unknown> => {
  const url = "/tour?" + QueryString.stringify(query);

  const queryFn = () => api.get(url);
  const queryKey = ["tour"] as const;

  return useQuery({ queryFn, queryKey, enabled: false });
};

export const useGetBasket = (): UseQueryResult<AxiosResponse<any>, unknown> => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"] as const;

  return useQuery({ queryFn, queryKey });
};

export const useGetUserTours = (): UseQueryResult<AxiosResponse<any>, unknown> => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"] as const;

  return useQuery({ queryFn, queryKey });
};

export const useGetTransactions = (): UseQueryResult<AxiosResponse<any>, unknown> => {
  const queryFn = () => api.get("/user/transactions");
  const queryKey = ["user-transactions"] as const;

  return useQuery({ queryFn, queryKey });
};

export const useGetTourImages = (): UseQueryResult<AxiosResponse<any>, unknown> => {
  const queryFn = () => api.get("/tour");
  const queryKey = ["tour-images"] as const;

  return useQuery({ queryFn, queryKey });
};
