export interface PriceHistory {
  baseDate: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  changeAmount: number;
  changeRate: number;
}

export interface StockData {
  stockCode: string;
  stockName: string;
  isinCode: string;
  market: string;
  listedDate: string;
  listedShares: number;
  marketCap: number;
  currentPrice: number;
  priceHistory: PriceHistory[];
}

export type Period = "1W" | "1M" | "1Y" | "10Y";
export type ChartType = "candlestick" | "line";
