import { useMutation } from "@tanstack/react-query";
import { postBacktest } from "@/lib/apis/postBacktest";
import type { BacktestResult } from "@/_BacktestingPage/types/backtestFormType";
import type { ApiResponse } from "@/lib/apis/types";

export const usePostBacktest = () => {
  const { mutate, isPending, error, data } = useMutation<
    ApiResponse<BacktestResult>,
    Error,
    Parameters<typeof postBacktest>[0]
  >({
    mutationFn: postBacktest,
  });

  return { mutate, isPending, error, data };
};
