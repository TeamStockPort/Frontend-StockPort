import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { MonthlyData } from "@/_BacktestingPage/types/backtestFormType";
import { formatNumber } from "@/lib/utils";

interface BacktestChartProps {
  data: MonthlyData[];
  label: string;
  color?: string;
  valueFormatter?: (value: number) => string;
}

interface ChartDataPoint {
  date: string;
  value: number;
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    payload: ChartDataPoint;
  }>;
};

const BacktestChart = ({
  data,
  label,
  color = "#3b82f6",
  valueFormatter = (value) => formatNumber(value),
}: BacktestChartProps) => {
  // 날짜 포맷팅 (YYYY-MM-DD -> MM/DD)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  // 차트 데이터 변환
  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    value: item.value,
  }));

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const dataPoint = payload[0];
      if (dataPoint && dataPoint.payload) {
        return (
          <div className="bg-white/90 shadow-lg backdrop-blur-sm p-3 border border-white/20 rounded-lg">
            <p className="mb-1 font-semibold text-gray-900">{dataPoint.payload.date}</p>
            <p className="font-medium text-gray-700">
              {label}: <span className="text-gray-900">{valueFormatter(dataPoint.value)}</span>
            </p>
          </div>
        );
      }
    }
    return null;
  };

  // Y축 포맷터 - 자산 추이의 경우 더 간결하게 표시
  const yAxisFormatter = (value: number): string => {
    if (label === "월별 자산 추이") {
      // 억 단위로 표시
      if (value >= 100000000) {
        return `${(value / 100000000).toFixed(1)}억`;
      }
      // 천만 단위로 표시
      if (value >= 10000000) {
        return `${(value / 10000000).toFixed(1)}천만`;
      }
      // 만 단위로 표시
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}만`;
      }
    }
    return valueFormatter(value);
  };

  return (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey="date"
                stroke="#9aa0a6"
                style={{ fontSize: "12px" }}
                tick={{ fill: "#9aa0a6" }}
              />
              <YAxis
                stroke="#9aa0a6"
                style={{ fontSize: "12px" }}
                tick={{ fill: "#9aa0a6" }}
                tickFormatter={yAxisFormatter}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacktestChart;
