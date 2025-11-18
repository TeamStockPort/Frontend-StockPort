export type Asset = {
  id: string;
  ticker: string;
  name: string;
  weight: number;
};

export type AssetRequest = {
  stockCd: string;
  weight: number;
};

export type BacktestRequest = {
  startDate: string; // "2017-11-18"
  endDate: string; // "2025-11-18"
  initialCapital: number;
  rebalanceCycle: "YEARLY" | "QUARTERLY" | "MONTHLY";
  assets: AssetRequest[];
};

export type SearchResult = {
  ticker: string;
  name: string;
};

// 백테스팅 결과 타입
export interface PortfolioSummary {
  portfolioName: string;
  initialCapital: number;
  finalCapital: number;
  cagr: number;
  maxDrawdown: number;
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
}

export interface MonthlyData {
  date: string;
  value: number;
}

export interface BacktestResult {
  kospiSummary: PortfolioSummary;
  kosdaqSummary: PortfolioSummary;
  portfolioSummary: PortfolioSummary;
  monthlyDrawdowns: MonthlyData[];
  monthlyAssets: MonthlyData[];
  monthlyReturns: MonthlyData[];
}
