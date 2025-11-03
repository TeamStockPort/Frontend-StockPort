import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { YAxis, AreaChart, Area, ResponsiveContainer } from "recharts";
import type { MarketType, MarketIndex } from "@/_MainPage/types/MarketIndexType";

type MarketIndexCardProps = {
  marketType: MarketType;
  marketIndex: MarketIndex;
};

const getChangeColor = (direction: MarketIndex["direction"]) => {
  // 변동성 색상을 결정하는 함수
  switch (direction) {
    case "up":
      return "text-red-500";
    case "down":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};
const getChartColor = (direction: MarketIndex["direction"]) => {
  // 차트 색상을 결정하는 함수
  switch (direction) {
    case "up":
      return "#EF4444";
    case "down":
      return "#3B82F6";
    default:
      return "#9CA3AF";
  }
};

const MarketIndexCard = ({ marketType, marketIndex }: MarketIndexCardProps) => {
  const isUp = marketIndex.direction === "up";
  const arrow = isUp ? "▲" : "▼";
  const sign = isUp ? "+" : "-";
  return (
    <Card className="bg-[#0A194E] border-gray-700 text-white">
      {/* 마켓 종류(KOSPI/KOSDAQ) */}
      <CardHeader>
        <CardTitle className="font-medium text-gray-300 text-lg">{marketType}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="font-bold text-4xl">{marketIndex.value}</p>
        {/* 상승여부에 따라 다른 색상으로 변동성 렌더링 */}
        <p className={`mt-2 text-lg font-semibold ${getChangeColor(marketIndex.direction)}`}>
          {arrow} {marketIndex.change.toFixed(2)} ({sign}
          {marketIndex.changePercent.toFixed(2)}%)
        </p>
        <div className="mt-4 h-24">
          {/* 차트 영역 */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketIndex.chartData}>
              {/* 그래프의 변동성을 더 크게 하기 위함 */}
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
              <defs>
                {/* 차트 아래 그래디언트 색상 정의 */}
                <linearGradient id={`color-${marketType}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={getChartColor(marketIndex.direction)}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor={getChartColor(marketIndex.direction)}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              {/* 차트 선 영역 */}
              <Area
                type="monotone"
                dataKey="value"
                stroke={getChartColor(marketIndex.direction)}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#color-${marketType})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndexCard;
