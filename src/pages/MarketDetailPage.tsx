import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { type Period, type ChartType } from "@/_MarketDetailPage/types/stockDataType";
import DetailItem from "@/_MarketDetailPage/components/DetailItem";
import StockChart from "@/_MarketDetailPage/components/StockChart";
import { useGetStockDetail } from "@/lib/hooks/useGetStockDetail";
import { formatNumber } from "@/lib/utils";
import ChartFilterBar from "@/_MarketDetailPage/components/ChartFilterBar";
import { Spinner } from "@/components/ui/spinner";

const MarketDetailPage = () => {
  const { code } = useParams<{ code: string }>();
  const [period, setPeriod] = useState<Period>("1M");
  const [chartType, setChartType] = useState<ChartType>("candlestick");

  // 항상 오늘 기준 7일 전 ~ 오늘 데이터 요청 (고정)
  const { data: stockData, isLoading, error } = useGetStockDetail(code || "", "1W");

  // API 데이터의 가장 최근 데이터와 그 직전 데이터 찾기
  const { latestData, previousData } = useMemo(() => {
    if (!stockData) {
      return { latestData: null, previousData: null };
    }

    // stockPriceList 필드명이 다를 수 있으므로 여러 가능성 확인
    const stockPriceList = stockData.stockPriceList;

    if (!stockPriceList) {
      return { latestData: null, previousData: null };
    }

    if (!Array.isArray(stockPriceList)) {
      return { latestData: null, previousData: null };
    }

    if (stockPriceList.length === 0) {
      return { latestData: null, previousData: null };
    }

    // API 데이터가 이미 현재-과거 순서로 오므로 정렬하지 않고 0, 1번째 인덱스 사용
    const latest = stockPriceList[0] || null;
    const previous = stockPriceList[1] || null;

    return {
      latestData: latest,
      previousData: previous,
    };
  }, [stockData]);

  // 등락 정보에 따른 스타일 계산
  const changeInfo = useMemo(() => {
    if (!stockData || !latestData) return null;

    if (latestData.changeRate > 0) {
      return { color: "text-red-500", icon: "▲" };
    } else if (latestData.changeRate < 0) {
      return { color: "text-blue-500", icon: "▼" };
    } else {
      return { color: "text-white", icon: null };
    }
  }, [stockData, latestData]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-navy-dark min-h-screen text-white">
        <Spinner className="size-12" />
      </div>
    );
  }

  // 에러 상태
  if (error || !stockData) {
    return (
      <div className="flex justify-center items-center bg-navy-dark min-h-screen text-white">
        <div className="text-red-500 text-xl">
          {error ? "데이터를 불러오는 중 오류가 발생했습니다." : "데이터를 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!changeInfo || !latestData || !previousData) {
    return (
      <div className="flex justify-center items-center bg-navy-dark min-h-screen text-white">
        <div className="text-xl">데이터가 없습니다.</div>
      </div>
    );
  }

  const highPriceColor =
    latestData.highPrice > previousData.highPrice ? "text-red-500" : "text-white";
  const lowPriceColor =
    latestData.lowPrice < previousData.lowPrice ? "text-blue-500" : "text-white";

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
            {formatNumber(latestData.closePrice)}
          </div>
          <div className={`flex items-center gap-2 mt-2 text-lg font-semibold ${changeInfo.color}`}>
            <span className="font-normal text-white">전일대비</span>
            {changeInfo.icon}
            <span>{formatNumber(latestData.changeAmount)}</span>
            <span>({latestData.changeRate.toFixed(2)}%)</span>
          </div>
        </section>

        {/* 우측: 상세 거래 정보 */}
        <section className="md:col-span-2 bg-white/5 p-4 rounded-lg">
          <dl className="gap-x-5 gap-y-5 grid grid-cols-2 md:grid-cols-3">
            <DetailItem label="전일" value={formatNumber(previousData.closePrice)} />
            <DetailItem
              label="고가"
              value={formatNumber(latestData.highPrice)}
              className={highPriceColor}
            />
            <DetailItem
              label="종가"
              value={formatNumber(latestData.closePrice)}
              className={changeInfo.color}
            />
            <DetailItem label="시가" value={formatNumber(latestData.openPrice)} />
            <DetailItem
              label="저가"
              value={formatNumber(latestData.lowPrice)}
              className={lowPriceColor}
            />
          </dl>
        </section>
      </main>

      {/* 하단: 차트 */}
      <div className="mt-8">
        <ChartFilterBar
          period={period}
          chartType={chartType}
          onChangePeriod={(value) => setPeriod(value as Period)}
          onChangeChartType={(value) => setChartType(value as ChartType)}
        />
        <div className="flex justify-center items-center bg-white/5 p-4 rounded-lg h-156">
          <StockChart stockCode={code || ""} period={period} chartType={chartType} />
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;
