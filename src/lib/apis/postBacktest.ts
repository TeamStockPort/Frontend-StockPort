import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";
import type { BacktestRequest, BacktestResult } from "@/_BacktestingPage/types/backtestFormType";
import type { ApiResponse } from "@/lib/apis/types";

export const postBacktest = async (data: BacktestRequest): Promise<ApiResponse<BacktestResult>> => {
  const response = await instance.post<ApiResponse<BacktestResult>>(API_ENDPOINTS.backtest(), data);

  // response.data가 없거나 구조가 다른 경우 처리
  if (!response.data) {
    throw new Error("응답 데이터가 없습니다.");
  }

  // 응답이 문자열인 경우 JSON 파싱 시도
  let parsedData = response.data;
  if (typeof response.data === "string") {
    try {
      parsedData = JSON.parse(response.data);
    } catch {
      throw new Error("응답 데이터 파싱에 실패했습니다.");
    }
  }

  // isSuccess가 false인 경우에만 에러 throw
  if (parsedData.isSuccess === false) {
    const errorMessage = parsedData.message || "백테스트 수행 중 오류가 발생했습니다.";
    throw new Error(errorMessage);
  }

  return parsedData;
};
