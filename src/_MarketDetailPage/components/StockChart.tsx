import ReactECharts from "echarts-for-react";
import { type ChartType, type Period } from "@/_MarketDetailPage/types/stockDataType";
import { useRef, useEffect, useMemo } from "react";
import { useGetStockDetail } from "@/lib/hooks/useGetStockDetail";
import { Spinner } from "@/components/ui/spinner";

interface StockChartProps {
  stockCode: string;
  period: Period;
  chartType: ChartType;
}

const StockChart = ({ stockCode, period, chartType }: StockChartProps) => {
  const isFirstRender = useRef(true);

  // period에 해당하는 API 요청
  const { data: stockData, isLoading } = useGetStockDetail(stockCode, period);

  useEffect(() => {
    isFirstRender.current = false;
  }, [chartType, period]);

  const formatDate = (dateString: string) => {
    const parts = dateString.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if (period === "10Y") {
      return `${year}.${month}`;
    } else {
      return `${month}.${day}`;
    }
  };

  // period에 따라 데이터 필터링 (useMemo는 early return 전에 호출)
  const filteredDataByPeriod = useMemo(() => {
    if (!stockData || !stockData.stockPriceList) {
      return [];
    }

    const reversedData = [...stockData.stockPriceList].reverse();

    // 10Y 기간일 때 3개월 단위로 필터링 (1월, 4월, 7월, 11월 1일)
    if (period === "10Y") {
      return reversedData.filter((item) => {
        const parts = item.baseDate.split("-");
        const month = parts[1];
        const day = parts[2];

        return (
          (month === "01" || month === "04" || month === "07" || month === "11") && day === "01"
        );
      });
    }

    return reversedData;
  }, [stockData, period]);

  // API 데이터가 없으면 로딩 표시
  if (isLoading || !stockData || !stockData.stockPriceList || filteredDataByPeriod.length === 0) {
    return (
      <div className="flex justify-center items-center h-500">
        <Spinner className="size-12" />
      </div>
    );
  }

  const dates = filteredDataByPeriod.map((item) => formatDate(item.baseDate));
  const candleData = filteredDataByPeriod.map((item) => [
    item.openPrice,
    item.closePrice,
    item.lowPrice,
    item.highPrice,
  ]);
  const lows = filteredDataByPeriod.map((d) => d.lowPrice);
  const highs = filteredDataByPeriod.map((d) => d.highPrice);

  const option = {
    animation: isFirstRender.current,
    animationDuration: 1000,
    animationEasing: "cubicOut",
    grid: {
      left: 10,
      right: 60,
      top: 30,
      bottom: 30,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: dates,
      scale: true,
      boundaryGap: ["0%", "10%"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true, color: "#9aa0a6", fontSize: 12 },
      min: "dataMin",
      max: "dataMax",
      axisPointer: {
        show: true,
      },
    },
    yAxis: {
      position: "right",
      scale: true,
      splitNumber: 4,
      min: Math.min(...lows),
      max: Math.max(...highs),
      axisLine: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "rgba(255,255,255,0.3)",
          width: 1,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        inside: false,
        color: "#9aa0a6",
      },
    },
    series: {
      type: chartType === "candlestick" ? "candlestick" : "line",
      data:
        chartType === "candlestick"
          ? candleData
          : filteredDataByPeriod.map((item) => item.closePrice),
      smooth: false,
      itemStyle:
        chartType === "candlestick"
          ? {
              color: "#ef4444",
              color0: "#3b82f6",
              borderColor: "#ef4444",
              borderColor0: "#3b82f6",
            }
          : { color: "#10b981" },
      lineStyle: chartType === "line" ? { width: 2, color: "#10b981" } : undefined,
      areaStyle:
        chartType === "line"
          ? {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(16, 185, 129, 0.4)",
                  },
                  {
                    offset: 1,
                    color: "rgba(16, 185, 129, 0)",
                  },
                ],
              },
            }
          : undefined,
      showSymbol: false,
    },
  };
  return (
    <div className="flex-col gap-20 m-10 w-full">
      <ReactECharts option={option} style={{ height: 500 }} />
    </div>
  );
};
export default StockChart;
