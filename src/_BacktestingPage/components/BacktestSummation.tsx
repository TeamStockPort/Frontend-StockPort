import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import type { PortfolioSummary } from "@/_BacktestingPage/types/backtestFormType";
import {
  formatPercentage,
  formatRatio,
  calculateReturnRate,
} from "@/_BacktestingPage/utils/backtestFormatters";

interface BacktestSummationProps {
  portfolioSummary: PortfolioSummary;
}

const BacktestSummation = ({ portfolioSummary }: BacktestSummationProps) => {
  const returnRate = calculateReturnRate(
    portfolioSummary.initialCapital,
    portfolioSummary.finalCapital
  );

  return (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">{portfolioSummary.portfolioName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* 초기 자본 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">초기 자본</div>
            <div className="font-bold text-white text-2xl">
              {formatNumber(portfolioSummary.initialCapital)}원
            </div>
          </div>

          {/* 최종 자본 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">최종 자본</div>
            <div className="font-bold text-green-400 text-2xl">
              {formatNumber(portfolioSummary.finalCapital)}원
            </div>
          </div>

          {/* 수익률 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">수익률</div>
            <div
              className={`text-2xl font-bold ${returnRate >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {formatPercentage(returnRate)}
            </div>
          </div>

          {/* CAGR */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">CAGR</div>
            <div
              className={`text-2xl font-bold ${portfolioSummary.cagr >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {formatPercentage(portfolioSummary.cagr)}
            </div>
          </div>

          {/* 최대 낙폭 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">최대 낙폭</div>
            <div className="font-bold text-red-400 text-2xl">
              {formatPercentage(portfolioSummary.maxDrawdown)}
            </div>
          </div>

          {/* 변동성 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">변동성</div>
            <div className="font-bold text-yellow-400 text-2xl">
              {formatPercentage(portfolioSummary.volatility)}
            </div>
          </div>

          {/* 샤프 비율 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">샤프 비율</div>
            <div className="font-bold text-blue-400 text-2xl">
              {formatRatio(portfolioSummary.sharpeRatio)}
            </div>
          </div>

          {/* 소르티노 비율 */}
          <div className="flex flex-col bg-white/5 p-4 border border-white/10 rounded-lg">
            <div className="mb-2 font-medium text-gray-400 text-sm">소르티노 비율</div>
            <div className="font-bold text-blue-400 text-2xl">
              {formatRatio(portfolioSummary.sortinoRatio)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacktestSummation;
