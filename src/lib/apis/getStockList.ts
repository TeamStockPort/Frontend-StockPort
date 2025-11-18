import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";
import type { ApiResponse } from "@/lib/apis/types";
import type { StockListResponse } from "@/_MarketsPage/types/marketItem";

export const getStockList = async (page: number, size: number) => {
  const response = await instance.get<ApiResponse<StockListResponse>>(
    API_ENDPOINTS.stockList(page, size)
  );

  if (response.data.isSuccess === false) {
    const errorMessage = response.data.message || "주식 목록 조회 중 오류가 발생했습니다.";
    throw new Error(errorMessage);
  }

  return response.data.result;
};
