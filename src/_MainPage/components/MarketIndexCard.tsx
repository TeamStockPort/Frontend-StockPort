import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { YAxis, AreaChart, Area, ResponsiveContainer } from "recharts";
import { Spinner } from "@/components/ui/spinner";
import type { MarketType, MarketIndex } from "@/_MainPage/types/MarketIndexType";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/apis/types";

type MarketIndexCardProps = {
  marketType: MarketType;
  marketIndex: MarketIndex | null;
  isLoading: boolean;
  error: unknown;
};

const getChangeColor = (changeRate: number) => {
  if (changeRate < 0) {
    return "text-blue-500";
  } else return "text-red-500";
};

const getChartColor = (changeRate: number) => {
  if (changeRate < 0) {
    return "#3B82F6";
  } else {
    return "#EF4444";
  }
};

const MarketIndexCard = ({ marketType, marketIndex, isLoading, error }: MarketIndexCardProps) => {
  // 로딩 상태
  if (isLoading) {
    return (
      <Card className="gap-1 sm:gap-6 bg-[#0A194E] py-3 sm:py-6 border-gray-700 text-white">
        <CardHeader className="gap-1 sm:gap-1.5 px-4 sm:px-6">
          <CardTitle className="font-medium text-gray-300 text-base sm:text-lg">
            {marketType}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex justify-center items-center h-48">
            <Spinner className="size-8 sm:size-12" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // 에러 상태
  if (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.detail || "데이터를 불러오는 중 오류가 발생했습니다.";

    return (
      <Card className="gap-1 sm:gap-6 bg-[#0A194E] py-3 sm:py-6 border-gray-700 text-white">
        <CardHeader className="gap-1 sm:gap-1.5 px-4 sm:px-6">
          <CardTitle className="font-medium text-gray-300 text-base sm:text-lg">
            {marketType}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex justify-center items-center h-48">
            <p className="text-red-500 text-sm sm:text-base text-center">{errorMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 데이터가 없는 경우
  if (!marketIndex) {
    return (
      <Card className="gap-1 sm:gap-6 bg-[#0A194E] py-3 sm:py-6 border-gray-700 text-white">
        <CardHeader className="gap-1 sm:gap-1.5 px-4 sm:px-6">
          <CardTitle className="font-medium text-gray-300 text-base sm:text-lg">
            {marketType}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-400 text-sm sm:text-base">데이터가 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 가장 최근 데이터 (배열의 마지막 항목)
  const latestData = marketIndex.data[marketIndex.data.length - 1];

  if (!latestData) {
    return (
      <Card className="gap-1 sm:gap-6 bg-[#0A194E] py-3 sm:py-6 border-gray-700 text-white">
        <CardHeader className="gap-1 sm:gap-1.5 px-4 sm:px-6">
          <CardTitle className="font-medium text-gray-300 text-base sm:text-lg">
            {marketType}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-400 text-sm sm:text-base">데이터가 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isUp = latestData.changeRate > 0;
  const arrow = isUp ? "▲" : "▼";
  const sign = isUp ? "+" : "";

  // 차트 데이터를 recharts 형식으로 변환
  const chartData = marketIndex.data.map((item) => ({
    date: item.baseDate,
    value: item.closePrice,
  }));

  return (
    <Card className="gap-1 sm:gap-6 bg-[#0A194E] py-2 sm:py-6 border-gray-700 text-white">
      <CardHeader className="gap-1 sm:gap-1.5 px-4 sm:px-6 pt-2">
        <CardTitle className="font-medium text-gray-300 text-base sm:text-lg">
          {marketType}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <p className="font-bold text-2xl sm:text-4xl">{latestData.closePrice.toLocaleString()}</p>
        <p
          className={`mt-1.5 sm:mt-2 text-sm sm:text-lg font-semibold ${getChangeColor(latestData.changeRate)}`}
        >
          {arrow} {Math.abs(latestData.changeAmount).toFixed(2)} ({sign}
          {latestData.changeRate.toFixed(2)}%)
        </p>
        <div className="mt-3 sm:mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
              <defs>
                <linearGradient id={`color-${marketType}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={getChartColor(latestData.changeRate)}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor={getChartColor(latestData.changeRate)}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={getChartColor(latestData.changeRate)}
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
