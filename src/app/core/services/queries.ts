import { useQuery } from "@tanstack/react-query";


import api from "../config/api";
import QueryString from "qs";

export const useGetUserData = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (query) => {
  const url = "/tour?" + QueryString.stringify(query);

  const queryFn = () => api.get(url);
  const queryKey = ["tour"];

  return useQuery({ queryFn, queryKey, enabled: false });
};

export const useGetBasket = () => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"];

  return useQuery({ queryFn, queryKey });
};
export const useGetUserTours = () => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"];

  return useQuery({ queryFn, queryKey });
};
export const useGetTransactions = () => {
  const queryFn = () => api.get("/user/transactions");
  const queryKey = ["user-transactions"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTourImages = () => {
  const queryFn = () => api.get("/tour"); 
  const queryKey = ["tour-images"];

  return useQuery({ queryFn, queryKey });
};

