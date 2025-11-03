import ChartFilterBar from "@/_MarketDetailPage/components/ChartFilterBar";
import ReactECharts from "echarts-for-react";
import {
  type ChartType,
  type Period,
  type PriceHistory,
} from "@/_MarketDetailPage/types/stockDataType";
import { useState, useRef } from "react";

interface StockChartProps {
  stockData: PriceHistory[];
}

const StockChart = ({ stockData }: StockChartProps) => {
  const [period, setPeriod] = useState<Period>("1M");
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const isFirstRender = useRef(true);

  const handleChangePeriod = (value: string) => {
    setPeriod(value as Period);
    isFirstRender.current = false;
  };

  const handleChangeChartType = (value: string) => {
    setChartType(value as ChartType);
    isFirstRender.current = false;
  };

  const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    if (period === "10Y") {
      return `${year}.${month}`;
    } else {
      return `${month}.${day}`;
    }
  };

  const dates = stockData.map((item) => formatDate(item.baseDate));
  const candleData = stockData.map((item) => [
    item.openPrice,
    item.closePrice,
    item.lowPrice,
    item.highPrice,
  ]);
  const lows = stockData.map((d) => d.lowPrice);
  const highs = stockData.map((d) => d.highPrice);

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
      data: chartType === "candlestick" ? candleData : stockData.map((item) => item.closePrice),
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
      <ChartFilterBar
        onChangePeriod={handleChangePeriod}
        onChangeChartType={handleChangeChartType}
      />
      <ReactECharts option={option} style={{ height: 500 }} />
    </div>
  );
};
export default StockChart;
