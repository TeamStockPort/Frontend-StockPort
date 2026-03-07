// --- 실제 API 모드 (백엔드 연결 시 주석 해제하고 아래 목데이터 모드 제거) ---
// /* eslint-disable no-console */
// import { getIndexData } from "@/lib/apis/getIndex";
// import MarketIndexCard from "@/_MainPage/components/MarketIndexCard";
// import { useQuery } from "@tanstack/react-query";
// import type { AxiosError } from "axios";
// import type { ApiErrorResponse } from "@/lib/apis/types";
// import { __DEV__ } from "@/utils/instance";
//
// export default function MarketIndexSection() {
//   const {
//     data: kospiData,
//     isLoading: isKospiLoading,
//     error: kospiError,
//   } = useQuery({
//     queryKey: ["indexData", "KOSPI"],
//     queryFn: () => getIndexData("KOSPI"),
//   });
//
//   const {
//     data: kosdaqData,
//     isLoading: isKosdaqLoading,
//     error: kosdaqError,
//   } = useQuery({
//     queryKey: ["indexData", "KOSDAQ"],
//     queryFn: () => getIndexData("KOSDAQ"),
//   });
//
//   if (__DEV__ && kospiError) {
//     const error = kospiError as AxiosError<ApiErrorResponse>;
//     if (error.response?.data) {
//       console.error("KOSPI 데이터 조회 에러:", error.response.data.detail);
//     }
//   }
//
//   if (__DEV__ && kosdaqError) {
//     const error = kosdaqError as AxiosError<ApiErrorResponse>;
//     if (error.response?.data) {
//       console.error("KOSDAQ 데이터 조회 에러:", error.response.data.detail);
//     }
//   }
//
//   return (
//     <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
//       <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
//         <MarketIndexCard
//           marketType="KOSPI"
//           marketIndex={kospiData ?? null}
//           isLoading={isKospiLoading}
//           error={kospiError}
//         />
//         <MarketIndexCard
//           marketType="KOSDAQ"
//           marketIndex={kosdaqData ?? null}
//           isLoading={isKosdaqLoading}
//           error={kosdaqError}
//         />
//       </div>
//     </div>
//   );
// }

// --- 목데이터 모드 ---
import MarketIndexCard from "@/_MainPage/components/MarketIndexCard";
import { MOCK_KOSPI, MOCK_KOSDAQ } from "@/_MainPage/mocks/marketIndexMock";

export default function MarketIndexSection() {
  return (
    <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        <MarketIndexCard
          marketType="KOSPI"
          marketIndex={MOCK_KOSPI}
          isLoading={false}
          error={null}
        />
        <MarketIndexCard
          marketType="KOSDAQ"
          marketIndex={MOCK_KOSDAQ}
          isLoading={false}
          error={null}
        />
      </div>
    </div>
  );
}
