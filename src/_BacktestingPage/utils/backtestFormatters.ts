import { formatNumber } from "@/lib/utils";

/**
 * 백분율 포맷팅 (소수점 2자리, + 기호 포함)
 */
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

/**
 * 비율 포맷팅 (소수점 2자리)
 */
export const formatRatio = (value: number): string => {
  return value.toFixed(2);
};

/**
 * 자본 포맷팅 (천 단위 구분자 + 원)
 */
export const formatCapital = (value: number): string => {
  return `${formatNumber(value)}원`;
};

/**
 * 수익률 계산
 */
export const calculateReturnRate = (initialCapital: number, finalCapital: number): number => {
  return ((finalCapital - initialCapital) / initialCapital) * 100;
};

