/**
 * API 응답 기본 타입
 */
export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/**
 * API 에러 응답 타입 (RFC 7807 Problem Details)
 */
export interface ApiErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

// 종목 검색 응답 타입
export type SearchAssetsResponse = {
  stockName: string;
  stockCode: string;
  isinCode: string;
};
