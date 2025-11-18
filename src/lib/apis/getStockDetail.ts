import type { Period, StockData } from "@/_MarketDetailPage/types/stockDataType";
import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";
import { format, subDays, subMonths, subYears } from "date-fns";

export const getStockDetail = async (stockCode: string, period: Period) => {
  const endDate = format(new Date(), "yyyy-MM-dd");
  let startDate: string;
  switch (period) {
    case "1W":
      startDate = format(subDays(new Date(), 7), "yyyy-MM-dd");
      break;
    case "1M":
      startDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");
      break;
    case "1Y":
      startDate = format(subYears(new Date(), 1), "yyyy-MM-dd");
      break;
    case "10Y":
      startDate = format(subYears(new Date(), 10), "yyyy-MM-dd");
      break;
    default:
      startDate = format(subMonths(new Date(), 1), "yyyy-MM-dd");
  }

  const response = await instance.get(API_ENDPOINTS.stockData(stockCode, startDate, endDate));

  if (response.data.isSuccess === false) {
    const errorMessage = response.data.message || "주식 상세 데이터 조회 중 오류가 발생했습니다.";
    throw new Error(errorMessage);
  }

  return response.data.result as StockData;
};
