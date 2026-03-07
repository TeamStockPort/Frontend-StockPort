import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  saveBacktestResult,
  getBacktestList,
  getBacktestById,
  deleteBacktest,
} from "@/lib/apis/backtestStorage";

export const useBacktestList = () => {
  return useQuery({
    queryKey: ["backtest-list"],
    queryFn: getBacktestList,
  });
};

export const useBacktestDetail = (id: string) => {
  return useQuery({
    queryKey: ["backtest-detail", id],
    queryFn: () => getBacktestById(id),
    enabled: !!id,
  });
};

export const useSaveBacktest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveBacktestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backtest-list"] });
    },
  });
};

export const useDeleteBacktest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBacktest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backtest-list"] });
    },
  });
};
