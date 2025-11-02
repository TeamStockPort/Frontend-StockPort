import { useState, useEffect } from "react";
import MarketList from "../_MarketsPage/components/MarketList";
import { MOCK_DATA } from "../_MarketsPage/datas/MarketMockData";
import type { MarketItem } from "../_MarketsPage/types/marketItem";
import Pagination from "../components/Pagination";
import Title from "../components/Title";

const ITEMS_PER_PAGE = 10;

const MarketsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [marketData, setMarketData] = useState<MarketItem[]>([]);

  // 주가 데이터 로딩
  useEffect(() => {
    // TODO: 백엔드 API 호출
    setMarketData(MOCK_DATA);
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(marketData.length / ITEMS_PER_PAGE);
  const currentItems = marketData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-6 md:px-12 min-h-screen font-sans text-white">
      <Title title="국내 시장"></Title>

      <main>
        <MarketList items={currentItems} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default MarketsPage;
