import { instance } from "@/utils/instance";
import { API_ENDPOINTS } from "@/constants/api";
import type { ApiResponse, SearchAssetsResponse } from "@/lib/apis/types";

export const searchAssets = async (keyword: string) => {
  // 빈 문자열이나 공백만 있는 경우 빈 배열 반환
  if (!keyword || !keyword.trim()) {
    return [];
  }

  const response = await instance.get<ApiResponse<SearchAssetsResponse[]>>(
    API_ENDPOINTS.searchAssets(keyword.trim())
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};
