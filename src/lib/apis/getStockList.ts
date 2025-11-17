import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";

export const getStockList = async (page: number, size: number) => {
  const response = await instance.get(API_ENDPOINTS.stockList(page, size));

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};
