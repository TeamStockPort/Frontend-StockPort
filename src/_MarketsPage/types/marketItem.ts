// API 응답 타입
export interface StockPriceData {
  baseDate: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  changeAmount: number;
  changeRate: number;
}

export interface StockListItem {
  stockName: string;
  stockCode: string;
  isinCode: string;
  listedDate: string;
  listedShared: number;
  marketCap: number;
  stockPriceList: StockPriceData[];
  rank: number;
}

export interface StockListResponse {
  content: StockListItem[];
  totalElements?: number;
  totalPages?: number;
}
