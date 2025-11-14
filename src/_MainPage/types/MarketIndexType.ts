export type MarketType = "KOSPI" | "KOSDAQ";

export type MarketIndex = {
  marketType: MarketType;
  startDate: string;
  endDate: string;
  data: {
    marketType: MarketType;
    baseDate: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    changeAmount: number;
    changeRate: number;
  }[];
};
