import type { SearchResult } from "@/_BacktestingPage/types/backtestFormType";
import { BACKEND_BASE_URL, API_ENDPOINTS } from "@/constants/api";

export const searchAsset = async (query: string): Promise<SearchResult[]> => {
  if (!query) return [];

  const res = await fetch(`${BACKEND_BASE_URL}${API_ENDPOINTS.searchAsset(query)}`);

  if (!res.ok) {
    // TODO: 에러 처리 로직 추가
    return [];
  }
  const data = await res.json();
  return data as SearchResult[];
};
