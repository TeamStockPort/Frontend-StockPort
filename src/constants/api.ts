export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const API_ENDPOINTS = {
  indexPeriod: (marketType: "KOSPI" | "KOSDAQ", startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate !== undefined) params.append("startDate", startDate);
    if (endDate !== undefined) params.append("endDate", endDate);
    const query = params.toString();
    return `/api/index/period/${marketType}${query ? `?${query}` : ""}`;
  },
  indexCurrent: () => `/api/index/current`,
  searchAsset: (keyword: string) => `/api/stock?keyword=${keyword}`,
  stockData: (stockcode: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate !== undefined) params.append("startDate", startDate);
    if (endDate !== undefined) params.append("endDate", endDate);
    const query = params.toString();
    return `/api/stock/${stockcode}${query ? `?${query}` : ""}`;
  },
  stockList: (page: number, size: number) =>
    `/api/stock/market-cap?page=${page}&size=${size}&sort=marketCap%2CDESC`,
};
