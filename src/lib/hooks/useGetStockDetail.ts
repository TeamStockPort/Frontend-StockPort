import type { Period } from "@/_MarketDetailPage/types/stockDataType";
import { getStockDetail } from "@/lib/apis/getStockDetail";
import { useQuery } from "@tanstack/react-query";

export const useGetStockDetail = (stockCode: string, period: Period) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stockDetail", stockCode, period],
    queryFn: () => getStockDetail(stockCode, period),
  });

  return { data, isLoading, error };
};
