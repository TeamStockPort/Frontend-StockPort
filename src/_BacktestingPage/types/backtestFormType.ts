export type BacktestFormValues = {
  start_date: string; // "2010-01-01"
  end_date: string; // "2020-12-31"
  rebalance_frequency: "매년" | "분기별" | "매월";
  initial_amount: number;
};

export type Asset = {
  id: string;
  ticker: string;
  name: string;
  weight: number;
};

export type AssetRequest = {
  name: string;
  ticker: string;
  weight: number;
};

export type BacktestRequest = BacktestFormValues & {
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
