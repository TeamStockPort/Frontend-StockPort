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

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.result as StockData;
};
