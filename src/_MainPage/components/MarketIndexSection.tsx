import MarketIndexCard from "@/_MainPage/components/MarketIndexCard";
import { marketData } from "@/_MainPage/mocks/marketData";

export default function MarketIndexSection() {
  return (
    <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* KOSPI 카드 */}
        <MarketIndexCard marketType="KOSPI" marketIndex={marketData.KOSPI} />
        {/* KOSDAQ 카드 */}
        <MarketIndexCard marketType="KOSDAQ" marketIndex={marketData.KOSDAQ} />
      </div>
    </div>
  );
}
