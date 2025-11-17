import { useState, useMemo } from "react";
import MarketList from "@/_MarketsPage/components/MarketList";
import type { StockListResponse } from "@/_MarketsPage/types/marketItem";
import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import { useGetStockList } from "@/lib/hooks/useGetStockList";
import { Spinner } from "@/components/ui/spinner";

const ITEMS_PER_PAGE = 10;

const MarketsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 주가 데이터 로딩 (페이지는 0부터 시작하는 경우가 많으므로 currentPage - 1 전달)
  const {
    data: stockListResponse,
    isLoading,
    error,
  } = useGetStockList(currentPage - 1, ITEMS_PER_PAGE);

  // API 응답에서 content 추출 (타입 변환 없이 직접 사용)
  const stockList = useMemo(() => {
    if (!stockListResponse) return [];
    const response = stockListResponse as StockListResponse;
    return response.content || [];
  }, [stockListResponse]);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    const response = stockListResponse as StockListResponse | undefined;
    if (response?.totalPages !== undefined) {
      return response.totalPages;
    }
    if (response?.totalElements !== undefined) {
      return Math.ceil(response.totalElements / ITEMS_PER_PAGE);
    }
    return 0;
  }, [stockListResponse]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center items-center px-6 md:px-12 min-h-screen font-sans text-white">
        <Spinner className="size-12" />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex justify-center items-center px-6 md:px-12 min-h-screen font-sans text-white">
        <div className="text-red-500 text-xl">데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 min-h-screen font-sans text-white">
      <Title title="국내 시장"></Title>

      <main>
        <MarketList
          items={stockList || []}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default MarketsPage;
