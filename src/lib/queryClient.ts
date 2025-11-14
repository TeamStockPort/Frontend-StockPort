import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 staleTime: 5분 (5분 동안은 fresh한 데이터로 간주)
      staleTime: 1000 * 60 * 5,
      // 기본 cacheTime: 10분 (10분 동안 캐시 유지)
      gcTime: 1000 * 60 * 10,
      // 에러 발생 시 재시도 횟수
      retry: 1,
      // 재시도 간격
      retryDelay: 1000,
      // 백그라운드에서 자동으로 데이터 refetch 비활성화 (필요시 조정)
      refetchOnWindowFocus: false,
      // 네트워크 재연결 시 자동 refetch
      refetchOnReconnect: true,
    },
    mutations: {
      // mutation 실패 시 재시도 횟수
      retry: 0,
    },
  },
});

