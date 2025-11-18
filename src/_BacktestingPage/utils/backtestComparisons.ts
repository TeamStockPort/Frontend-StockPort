import type { BacktestResult as BacktestResultType } from "@/_BacktestingPage/types/backtestFormType";
import { calculateReturnRate, formatPercentage, formatRatio, formatCapital } from "./backtestFormatters";

/**
 * 포트폴리오가 벤치마크보다 더 좋은지 판단
 */
export const isPortfolioBetter = (
  portfolioValue: number,
  kospiValue: number,
  kosdaqValue: number,
  higherIsBetter: boolean
): boolean => {
  if (higherIsBetter) {
    return portfolioValue > kospiValue && portfolioValue > kosdaqValue;
  } else {
    return portfolioValue < kospiValue && portfolioValue < kosdaqValue;
  }
};

/**
 * 비교 테이블 행 데이터 타입
 */
export interface ComparisonRow {
  label: string;
  kospi: number;
  kosdaq: number;
  portfolio: number;
  format: (val: number) => string;
  higherIsBetter: boolean;
}

/**
 * 백테스팅 결과로부터 비교 테이블 행 데이터 생성
 */
export const createComparisonRows = (data: BacktestResultType): ComparisonRow[] => {
  const { kospiSummary, kosdaqSummary, portfolioSummary } = data;

  const kospiReturnRate = calculateReturnRate(
    kospiSummary.initialCapital,
    kospiSummary.finalCapital
  );
  const kosdaqReturnRate = calculateReturnRate(
    kosdaqSummary.initialCapital,
    kosdaqSummary.finalCapital
  );
  const portfolioReturnRate = calculateReturnRate(
    portfolioSummary.initialCapital,
    portfolioSummary.finalCapital
  );

  return [
    {
      label: "초기 자본",
      kospi: kospiSummary.initialCapital,
      kosdaq: kosdaqSummary.initialCapital,
      portfolio: portfolioSummary.initialCapital,
      format: formatCapital,
      higherIsBetter: false, // 초기 자본은 비교 의미 없음
    },
    {
      label: "최종 자본",
      kospi: kospiSummary.finalCapital,
      kosdaq: kosdaqSummary.finalCapital,
      portfolio: portfolioSummary.finalCapital,
      format: formatCapital,
      higherIsBetter: true,
    },
    {
      label: "수익률",
      kospi: kospiReturnRate,
      kosdaq: kosdaqReturnRate,
      portfolio: portfolioReturnRate,
      format: formatPercentage,
      higherIsBetter: true,
    },
    {
      label: "CAGR",
      kospi: kospiSummary.cagr,
      kosdaq: kosdaqSummary.cagr,
      portfolio: portfolioSummary.cagr,
      format: formatPercentage,
      higherIsBetter: true,
    },
    {
      label: "최대 낙폭",
      kospi: kospiSummary.maxDrawdown,
      kosdaq: kosdaqSummary.maxDrawdown,
      portfolio: portfolioSummary.maxDrawdown,
      format: formatPercentage,
      higherIsBetter: false, // 낮을수록 좋음
    },
    {
      label: "변동성",
      kospi: kospiSummary.volatility,
      kosdaq: kosdaqSummary.volatility,
      portfolio: portfolioSummary.volatility,
      format: formatPercentage,
      higherIsBetter: false, // 낮을수록 좋음
    },
    {
      label: "샤프 비율",
      kospi: kospiSummary.sharpeRatio,
      kosdaq: kosdaqSummary.sharpeRatio,
      portfolio: portfolioSummary.sharpeRatio,
      format: formatRatio,
      higherIsBetter: true,
    },
    {
      label: "소르티노 비율",
      kospi: kospiSummary.sortinoRatio,
      kosdaq: kosdaqSummary.sortinoRatio,
      portfolio: portfolioSummary.sortinoRatio,
      format: formatRatio,
      higherIsBetter: true,
    },
  ];
};

