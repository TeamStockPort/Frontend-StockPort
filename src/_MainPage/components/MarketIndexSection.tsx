/* eslint-disable no-console */
import { getIndexData } from "@/lib/apis/getIndex";
import MarketIndexCard from "@/_MainPage/components/MarketIndexCard";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/apis/types";
import { __DEV__ } from "@/utils/instance";

export default function MarketIndexSection() {
  // KOSPI 데이터 조회 - 독립적으로 실행
  const {
    data: kospiData,
    isLoading: isKospiLoading,
    error: kospiError,
  } = useQuery({
    queryKey: ["indexData", "KOSPI"],
    queryFn: () => getIndexData("KOSPI"),
  });

  // KOSDAQ 데이터 조회 - 독립적으로 실행
  const {
    data: kosdaqData,
    isLoading: isKosdaqLoading,
    error: kosdaqError,
  } = useQuery({
    queryKey: ["indexData", "KOSDAQ"],
    queryFn: () => getIndexData("KOSDAQ"),
  });

  // 에러 처리 (개발 환경에서만 로깅)
  if (__DEV__ && kospiError) {
    const error = kospiError as AxiosError<ApiErrorResponse>;
    if (error.response?.data) {
      console.error("KOSPI 데이터 조회 에러:", error.response.data.detail);
    }
  }

  if (__DEV__ && kosdaqError) {
    const error = kosdaqError as AxiosError<ApiErrorResponse>;
    if (error.response?.data) {
      console.error("KOSDAQ 데이터 조회 에러:", error.response.data.detail);
    }
  }

  return (
    <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* KOSPI 카드 - 독립적인 로딩/에러 상태 */}
        <MarketIndexCard
          marketType="KOSPI"
          marketIndex={kospiData ?? null}
          isLoading={isKospiLoading}
          error={kospiError}
        />
        {/* KOSDAQ 카드 - 독립적인 로딩/에러 상태 */}
        <MarketIndexCard
          marketType="KOSDAQ"
          marketIndex={kosdaqData ?? null}
          isLoading={isKosdaqLoading}
          error={kosdaqError}
        />
      </div>
    </div>
  );
}
