import type { BacktestRequest, BacktestResult } from "@/_BacktestingPage/types/backtestFormType";
import type { ApiResponse } from "@/lib/apis/types";

// 목 요청 데이터 - 삼성전자 60% + SK하이닉스 40%, 5년 (2021-03 ~ 2026-02)
export const MOCK_BACKTEST_REQUEST: BacktestRequest = {
  startDate: "2021-03-01",
  endDate: "2026-02-28",
  initialCapital: 10000000,
  rebalanceCycle: "YEARLY",
  assets: [
    { stockCd: "005930", weight: 60 },
    { stockCd: "000660", weight: 40 },
  ],
};

// 실제 주가 기반 목데이터
// 삼성전자: 82,000(2021.03) → 178,600(2026.02), 약 2.18배
// SK하이닉스: 135,000(2021.03) → 1,000,000(2026.02), 약 7.41배
// 포트폴리오(60:40): 10,000,000 → 약 38,200,000 (CAGR ~30.6%)
export const MOCK_BACKTEST_RESULT: BacktestResult = {
  kospiSummary: {
    portfolioName: "KOSPI",
    initialCapital: 10000000,
    finalCapital: 14250000,
    cagr: 7.35,
    maxDrawdown: -25.2,
    volatility: 18.4,
    sharpeRatio: 0.85,
    sortinoRatio: 1.08,
  },
  kosdaqSummary: {
    portfolioName: "KOSDAQ",
    initialCapital: 10000000,
    finalCapital: 12180000,
    cagr: 4.02,
    maxDrawdown: -32.1,
    volatility: 24.6,
    sharpeRatio: 0.55,
    sortinoRatio: 0.68,
  },
  portfolioSummary: {
    portfolioName: "삼성전자 60% + SK하이닉스 40%",
    initialCapital: 10000000,
    finalCapital: 38200000,
    cagr: 30.63,
    maxDrawdown: -33.2,
    volatility: 32.8,
    sharpeRatio: 1.85,
    sortinoRatio: 2.42,
  },
  monthlyAssets: [
    // 2021 - 반도체 호황 후반
    { date: "2021-03-31", value: 10000000 },
    { date: "2021-06-30", value: 9620000 },
    { date: "2021-09-30", value: 8480000 },
    { date: "2021-12-31", value: 9380000 },
    // 2022 - 반도체 다운사이클
    { date: "2022-03-31", value: 8350000 },
    { date: "2022-06-30", value: 7280000 },
    { date: "2022-09-30", value: 6680000 },
    { date: "2022-12-31", value: 6760000 },
    // 2023 - 회복 시작
    { date: "2023-03-31", value: 7520000 },
    { date: "2023-06-30", value: 9180000 },
    { date: "2023-09-30", value: 8640000 },
    { date: "2023-12-31", value: 10280000 },
    // 2024 - 하이닉스 급등, 삼성 하락
    { date: "2024-03-31", value: 10900000 },
    { date: "2024-06-30", value: 13120000 },
    { date: "2024-09-30", value: 10580000 },
    { date: "2024-12-31", value: 10020000 },
    // 2025 - AI 반도체 슈퍼사이클
    { date: "2025-03-31", value: 11400000 },
    { date: "2025-06-30", value: 18200000 },
    { date: "2025-09-30", value: 28500000 },
    { date: "2025-12-31", value: 35800000 },
    // 2026
    { date: "2026-02-28", value: 38200000 },
  ],
  monthlyReturns: [
    { date: "2021-03-31", value: 0.0 },
    { date: "2021-06-30", value: -3.8 },
    { date: "2021-09-30", value: -11.85 },
    { date: "2021-12-31", value: 10.61 },
    { date: "2022-03-31", value: -10.98 },
    { date: "2022-06-30", value: -12.81 },
    { date: "2022-09-30", value: -8.24 },
    { date: "2022-12-31", value: 1.2 },
    { date: "2023-03-31", value: 11.24 },
    { date: "2023-06-30", value: 22.07 },
    { date: "2023-09-30", value: -5.88 },
    { date: "2023-12-31", value: 18.98 },
    { date: "2024-03-31", value: 6.03 },
    { date: "2024-06-30", value: 20.37 },
    { date: "2024-09-30", value: -19.36 },
    { date: "2024-12-31", value: -5.29 },
    { date: "2025-03-31", value: 13.77 },
    { date: "2025-06-30", value: 59.65 },
    { date: "2025-09-30", value: 56.59 },
    { date: "2025-12-31", value: 25.61 },
    { date: "2026-02-28", value: 6.7 },
  ],
  monthlyDrawdowns: [
    { date: "2021-03-31", value: 0.0 },
    { date: "2021-06-30", value: -3.8 },
    { date: "2021-09-30", value: -15.2 },
    { date: "2021-12-31", value: -6.2 },
    { date: "2022-03-31", value: -16.5 },
    { date: "2022-06-30", value: -27.2 },
    { date: "2022-09-30", value: -33.2 },
    { date: "2022-12-31", value: -32.4 },
    { date: "2023-03-31", value: -24.8 },
    { date: "2023-06-30", value: -8.2 },
    { date: "2023-09-30", value: -13.6 },
    { date: "2023-12-31", value: -2.8 },
    { date: "2024-03-31", value: 0.0 },
    { date: "2024-06-30", value: 0.0 },
    { date: "2024-09-30", value: -19.36 },
    { date: "2024-12-31", value: -23.63 },
    { date: "2025-03-31", value: -13.12 },
    { date: "2025-06-30", value: 0.0 },
    { date: "2025-09-30", value: 0.0 },
    { date: "2025-12-31", value: 0.0 },
    { date: "2026-02-28", value: 0.0 },
  ],
};

// API 응답 형식 목데이터
export const MOCK_BACKTEST_API_RESPONSE: ApiResponse<BacktestResult> = {
  isSuccess: true,
  code: "200",
  message: "백테스트가 성공적으로 완료되었습니다.",
  result: MOCK_BACKTEST_RESULT,
};
