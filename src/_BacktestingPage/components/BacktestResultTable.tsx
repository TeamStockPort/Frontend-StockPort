import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BacktestResult as BacktestResultType } from "@/_BacktestingPage/types/backtestFormType";
import {
  createComparisonRows,
  isPortfolioBetter,
} from "@/_BacktestingPage/utils/backtestComparisons";

interface BacktestResultTableProps {
  data: BacktestResultType;
}

const BacktestResultTable = ({ data }: BacktestResultTableProps) => {
  const comparisonRows = createComparisonRows(data);

  return (
    <Card className="bg-white/5 mt-8 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">벤치마크 비교</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-white/10 border-b">
                <th className="p-4 font-semibold text-gray-300 text-left">지표</th>
                <th className="p-4 font-semibold text-gray-300 text-center">KOSPI</th>
                <th className="p-4 font-semibold text-gray-300 text-center">KOSDAQ</th>
                <th className="p-4 font-semibold text-gray-300 text-center">나의 포트폴리오</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => {
                const isBetter =
                  row.label === "초기 자본"
                    ? false
                    : isPortfolioBetter(row.portfolio, row.kospi, row.kosdaq, row.higherIsBetter);

                return (
                  <tr
                    key={index}
                    className="hover:bg-white/5 border-white/10 border-b transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-300">{row.label}</td>
                    <td className="p-4 text-white text-center">{row.format(row.kospi)}</td>
                    <td className="p-4 text-white text-center">{row.format(row.kosdaq)}</td>
                    <td
                      className={`p-4 text-center font-semibold ${
                        isBetter ? "text-green-400" : "text-white"
                      }`}
                    >
                      {row.format(row.portfolio)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacktestResultTable;
