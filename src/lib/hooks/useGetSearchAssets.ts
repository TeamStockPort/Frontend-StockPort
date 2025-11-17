import { searchAssets } from "@/lib/apis/searchAssets";
import { useQuery } from "@tanstack/react-query";

export const useGetSearchAssets = (keyword: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchAssets", keyword],
    queryFn: () => searchAssets(keyword),
    enabled: Boolean(keyword && keyword.trim().length > 0),
  });

  return { data, isLoading, error };
};
