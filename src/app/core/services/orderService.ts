import api from "../../core/config/api";
export interface CreateOrderDto {
  tourId: number;
  passengers: {
    firstName: string;
    lastName: string;
    nationalCode: string;
     gender: "male" | "female" | "other";
  }[];
}
export const orderService = {
  create(data: CreateOrderDto) {
    return api.post("/order", data);
  },
};
