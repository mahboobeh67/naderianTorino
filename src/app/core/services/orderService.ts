import { AxiosResponse } from "axios";
import api from "../../core/config/api";

export interface PassengerDto {
  firstName: string;
  lastName: string;
  nationalCode: string;
  gender: "male" | "female"; // طبق الگوی Swagger
}

export interface CreateOrderDto {
  tourId: number;
  passengers: PassengerDto[];
}

export interface OrderResponse {
  id?: string;
  message?: string;
  [key: string]: any;
}

export const orderService = {
  create(data: CreateOrderDto): Promise<AxiosResponse<OrderResponse>> {
    return api.post<OrderResponse>("/order", data);
  },
};

