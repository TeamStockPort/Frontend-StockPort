import { API_ENDPOINTS } from "@/constants/api";
import { instance } from "@/utils/instance";
import type { BacktestRequest, BacktestResult } from "@/_BacktestingPage/types/backtestFormType";
import type { ApiResponse } from "@/lib/apis/types";
import type { AxiosError } from "axios";

export const postBacktest = async (data: BacktestRequest): Promise<ApiResponse<BacktestResult>> => {
  try {
    const response = await instance.post<ApiResponse<BacktestResult>>(
      API_ENDPOINTS.backtest(),
      data
    );

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
  } catch (error) {
    // AxiosError인 경우 response.data에서 message 추출 시도
    const axiosError = error as AxiosError<ApiResponse<BacktestResult>>;
    if (axiosError.response?.data) {
      let errorResponse = axiosError.response.data;

      // 응답이 문자열인 경우 JSON 파싱 시도
      if (typeof errorResponse === "string") {
        try {
          errorResponse = JSON.parse(errorResponse);
        } catch {
          // 파싱 실패 시 그대로 진행
        }
      }

      // ApiResponse 형식이고 isSuccess가 false인 경우
      if (
        errorResponse &&
        typeof errorResponse === "object" &&
        "isSuccess" in errorResponse &&
        errorResponse.isSuccess === false
      ) {
        const errorMessage = errorResponse.message || "백테스트 수행 중 오류가 발생했습니다.";
        throw new Error(errorMessage);
      }
    }

    // 이미 Error 객체인 경우 (우리가 throw한 Error 또는 다른 Error)
    if (error instanceof Error) {
      throw error;
    }

    // 그 외의 경우 기본 에러 메시지
    throw new Error("백테스트 수행 중 오류가 발생했습니다.");
  }
};
