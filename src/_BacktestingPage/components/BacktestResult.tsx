import type { BacktestResult as BacktestResultType } from "@/_BacktestingPage/types/backtestFormType";
import BacktestSummation from "./BacktestSummation";
import BacktestResultTable from "./BacktestResultTable";
import BacktestChart from "./BacktestChart";
import { formatNumber } from "@/lib/utils";

interface BacktestResultProps {
  data: BacktestResultType;
}

const BacktestResult = ({ data }: BacktestResultProps) => {
  // 수익률 포맷팅 함수
  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 font-bold text-white text-2xl">백테스트 결과</h2>
      <BacktestSummation portfolioSummary={data.portfolioSummary} />
      <BacktestResultTable data={data} />

      {/* 차트 섹션 */}
      <div className="gap-6 grid grid-cols-1 mt-8">
        {/* 월별 자산 추이 */}
        <BacktestChart
          data={data.monthlyAssets}
          label="월별 자산 추이"
          color="#10b981"
          valueFormatter={(value) => `${formatNumber(value)}원`}
        />

        {/* 월별 수익률 */}
        <BacktestChart
          data={data.monthlyReturns}
          label="월별 수익률"
          color="#3b82f6"
          valueFormatter={formatPercentage}
        />

        {/* 월별 최대 낙폭 */}
        <BacktestChart
          data={data.monthlyDrawdowns}
          label="월별 최대 낙폭"
          color="#ef4444"
          valueFormatter={formatPercentage}
        />
      </div>
    </div>
  );
};

export default BacktestResult;
