import type { Asset, AssetRequest } from "@/_BacktestingPage/types/backtestFormType";

// Asset type에서 id를 제거
export const convertAssetsForRequest = (assets: Asset[]): AssetRequest[] => {
  return assets.map(({ name, ticker, weight }) => ({
    name,
    ticker,
    weight,
  }));
};
