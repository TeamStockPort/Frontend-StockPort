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
