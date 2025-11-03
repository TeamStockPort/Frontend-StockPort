import ChartFilterBar from "@/_MarketDetailPage/components/ChartFilterBar";
import ReactECharts from "echarts-for-react";
import type { PriceHistory } from "@/_MarketDetailPage/types/stockDataType";

interface StockChartProps {
  stockData: PriceHistory[];
}

const StockChart = ({ stockData }: StockChartProps) => {
  const dates = stockData.map((item) => item.baseDate);
  const candleData = stockData.map((item) => [
    item.openPrice,
    item.closePrice,
    item.lowPrice,
    item.highPrice,
  ]);

  const option = {
    animation: true,
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
      type: "candlestick",
      data: candleData,
      itemStyle: {
        color: "#ef4444",
        color0: "#3b82f6",
        borderColor: "#ef4444",
        borderColor0: "#3b82f6",
      },
    },
  };
  return (
    <div className="flex-col gap-20 m-10 w-full">
      <ChartFilterBar />
      <ReactECharts option={option} style={{ height: 500 }} />
    </div>
  );
};
export default StockChart;
