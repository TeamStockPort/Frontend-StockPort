import type { StockListItem } from "@/_MarketsPage/types/marketItem";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "@/lib/utils";

interface MarketListProps {
  items: StockListItem[];
  currentPage: number;
  itemsPerPage: number;
}

const getChangeInfo = (changeRate: number) => {
  if (changeRate > 0) return { className: "text-red-500", icon: "▲" };
  if (changeRate < 0) return { className: "text-blue-500", icon: "▼" };
  return { className: "text-white", icon: "" };
};

const MarketList = ({ items, currentPage, itemsPerPage }: MarketListProps) => {
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <table className="w-full text-white border-collapse table-fixed">
      <thead>
        <tr className="border-white/10 border-b">
          <th className="p-4 w-16 font-normal text-gray-400 text-sm text-left">종목</th>
          <th className="p-4 w-40 font-normal text-gray-400 text-sm text-left">자산명</th>
          <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">현재가</th>
          <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">등락률</th>
          <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">시가총액</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const latestPrice = item.stockPriceList?.[0];
          const changeRate = latestPrice?.changeRate ?? 0;
          const { className, icon } = getChangeInfo(changeRate);
          return (
            <tr
              key={item.stockCode}
              className="hover:bg-white/5 border-white/10 border-b cursor-pointer"
              onClick={() => navigate(`/markets/${item.stockCode}`)}
            >
              {/* 순번 */}
              <td className="p-4 text-gray-400 align-middle">{startIndex + index + 1}</td>

              {/* 종목명과 코드 */}
              <td className="p-4 align-middle">
                <div className="font-bold">{item.stockName}</div>
                <div className="text-gray-400 text-sm">{item.stockCode}</div>
              </td>

              {/* 현재가 */}
              <td className={`p-4 align-middle font-bold ${className}`}>
                {formatNumber(latestPrice?.closePrice ?? 0)}원
              </td>

              {/* 등락률 */}
              <td className={`p-4 align-middle ${className}`}>
                {icon} {Math.abs(changeRate).toFixed(2)}%
              </td>

              {/* 시가총액 */}
              <td className="p-4 align-middle">{formatNumber(item.marketCap)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MarketList;
