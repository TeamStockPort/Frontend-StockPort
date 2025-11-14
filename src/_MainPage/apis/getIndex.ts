import { format, subDays } from "date-fns";
import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";
import type { ApiResponse } from "@/lib/apis/types";
import type { MarketIndex } from "@/_MainPage/types/MarketIndexType";

/**
 * 지수 데이터 조회 API
 * @param marketType - 시장 타입 ("KOSPI" | "KOSDAQ")
 * @returns Promise<MarketIndex> - 지수 데이터
 */
export const getIndexData = async (marketType: "KOSPI" | "KOSDAQ"): Promise<MarketIndex> => {
  const today = new Date();
  const endDate = format(today, "yyyy-MM-dd");
  const startDate = format(subDays(today, 10), "yyyy-MM-dd");

  const response = await instance.get<ApiResponse<MarketIndex>>(
    API_ENDPOINTS.indexPeriod(marketType, startDate, endDate)
  );

  // ApiResponse의 result 필드 반환
  return response.data.result;
};
