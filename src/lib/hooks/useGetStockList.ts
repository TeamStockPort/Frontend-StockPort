import { useQuery } from "@tanstack/react-query";
import { getStockList } from "@/lib/apis/getStockList";

export const useGetStockList = (page: number, size: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stockList", page, size],
    queryFn: () => getStockList(page, size),
  });

  return { data, isLoading, error };
};
