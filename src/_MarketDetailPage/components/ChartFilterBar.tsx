import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartCandlestick, ChartLine } from "lucide-react";
import { type Period, type ChartType } from "@/_MarketDetailPage/types/stockDataType";

interface ChartFilterBarProps {
  period: Period;
  chartType: ChartType;
  onChangePeriod: (value: string) => void;
  onChangeChartType: (value: string) => void;
}

const ChartFilterBar = ({
  period,
  chartType,
  onChangePeriod,
  onChangeChartType,
}: ChartFilterBarProps) => {
  return (
    <div className="flex justify-start items-center gap-4 ml-2.5 h-20">
      <Tabs value={period} onValueChange={onChangePeriod}>
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger
            value="1W"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            1W
          </TabsTrigger>
          <TabsTrigger
            value="1M"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            1M
          </TabsTrigger>
          <TabsTrigger
            value="1Y"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            1Y
          </TabsTrigger>
          <TabsTrigger
            value="10Y"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            10Y
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs value={chartType} onValueChange={onChangeChartType}>
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger
            value="candlestick"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            <ChartCandlestick />
          </TabsTrigger>
          <TabsTrigger
            value="line"
            className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white"
          >
            <ChartLine />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
export default ChartFilterBar;
