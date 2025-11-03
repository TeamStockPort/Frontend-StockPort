import { useState, useEffect, useMemo } from "react";
import { format, subDays } from "date-fns";
import { type PriceHistory, type StockData } from "@/_MarketDetailPage/types/stockDataType";
import DetailItem from "@/_MarketDetailPage/components/DetailItem";
import { sampleData } from "@/_MarketDetailPage/datas/stockSample";
import StockChart from "@/_MarketDetailPage/components/StockChart";
const MarketDetailPage = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [todayData, setTodayData] = useState<PriceHistory>();
  const [prevData, setPrevData] = useState<PriceHistory>();

  // 데이터 로딩 (실제로는 API 호출)
  useEffect(() => {
    setStockData(sampleData);
    const today = format(new Date(), "yyyyMMdd");
    const yesterday = format(subDays(new Date(), 1), "yyyyMMdd");

    const foundTodayData = sampleData.priceHistory.find((data) => data.baseDate === today);
    if (foundTodayData) {
      setTodayData(foundTodayData);
    }

    const foundPrevData = sampleData.priceHistory.find((data) => data.baseDate === yesterday);
    if (foundPrevData) {
      setPrevData(foundPrevData);
    }
  }, []);

  // 등락 정보에 따른 스타일 계산
  const changeInfo = useMemo(() => {
    if (!stockData || !todayData) return null;

    if (todayData.changeRate > 0) {
      return { color: "text-red-500", icon: "▲" };
    } else if (todayData.changeRate < 0) {
      return { color: "text-blue-500", icon: "▼" };
    } else {
      return { color: "text-white", icon: null };
    }
  }, [stockData, todayData]);

  if (!stockData || !changeInfo || !todayData || !prevData) {
    return (
      <div className="flex justify-center items-center bg-navy-dark min-h-screen text-white">
        Loading...
      </div>
    );
  }
  const highPriceColor = todayData.highPrice > prevData.highPrice ? "text-red-500" : "text-white";
  const lowPriceColor = todayData.lowPrice < prevData.lowPrice ? "text-blue-500" : "text-white";

  return (
    <div className="bg-navy-dark mx-15 md:p-8 min-h-screen font-sans text-white">
      {/* 상단: 종목명 및 코드 */}
      <header className="pb-4 border-white/10 border-b">
        <div className="flex items-baseline gap-3">
          <h1 className="font-bold text-4xl">{stockData.stockName}</h1>
          <p className="text-gray-400 text-lg">{stockData.stockCode}</p>
        </div>
      </header>

      {/* 중단: 가격 및 상세 정보 */}
      <main className="gap-8 grid grid-cols-1 md:grid-cols-3 mt-6">
        {/* 좌측: 현재가 정보 */}
        <section className="flex flex-col justify-center">
          <div className={`text-5xl font-bold ${changeInfo.color}`}>
            {stockData.currentPrice.toLocaleString()}
          </div>
          <div className={`flex items-center gap-2 mt-2 text-lg font-semibold ${changeInfo.color}`}>
            <span className="font-normal text-white">전일대비</span>
            {changeInfo.icon}
            <span>{todayData.changeAmount.toLocaleString()}</span>
            <span>({todayData.changeRate.toFixed(2)}%)</span>
          </div>
        </section>

        {/* 우측: 상세 거래 정보 */}
        <section className="md:col-span-2 bg-white/5 p-4 rounded-lg">
          <dl className="gap-x-5 gap-y-5 grid grid-cols-2 md:grid-cols-3">
            <DetailItem label="전일" value={prevData.closePrice.toLocaleString()} />
            <DetailItem
              label="고가"
              value={todayData.highPrice.toLocaleString()}
              className={highPriceColor}
            />
            <DetailItem
              label="종가"
              value={stockData.currentPrice.toLocaleString()}
              className={changeInfo.color}
            />
            <DetailItem label="시가" value={todayData.openPrice.toLocaleString()} />
            <DetailItem
              label="저가"
              value={todayData.lowPrice.toLocaleString()}
              className={lowPriceColor}
            />
          </dl>
        </section>
      </main>

      {/* 하단: 차트 */}
      <div className="mt-8">
        <div className="flex justify-center items-center bg-white/5 p-4 rounded-lg h-156">
          <StockChart stockData={stockData.priceHistory} />
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;
