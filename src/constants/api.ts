export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const API_ENDPOINTS = {
  indexPeriod: (marketType: "KOSPI" | "KOSDAQ", startDate?: string, endDate?: string) =>
    `/api/index/period/${marketType}?startDate=${startDate}&endDate=${endDate}`,
  indexCurrent: () => `/api/index/current`,
  searchAsset: (keyword: string) => `/api/stock?keyword=${keyword}`,
  stockData: (stockcode: string, startDate?: string, endDate?: string) =>
    `/api/stock/${stockcode}?startDate=${startDate}&endDate=${endDate}`,
  stockList: (page: number, size: number) =>
    `/api/stock/market-cap?page=${page}&size=${size}&sort=marketCap%2CDESC`,
};
