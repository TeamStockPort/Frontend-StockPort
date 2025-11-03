import type { MarketIndexData } from "@/_MainPage/types/MarketIndexType";

export const marketData: MarketIndexData = {
  KOSPI: {
    value: 2716.26,
    change: 3.18,
    changePercent: 0.12,
    direction: "up",
    chartData: [
      { date: "2025-06-06", value: 2703 },
      { date: "2025-06-07", value: 2707 },
      { date: "2025-06-08", value: 2713 },
      { date: "2025-06-09", value: 2710 },
      { date: "2025-06-10", value: 2716.26 },
    ],
  },
  KOSDAQ: {
    value: 868.43,
    change: 1.12,
    changePercent: 0.18,
    direction: "down",
    chartData: [
      { date: "2025-06-06", value: 872 },
      { date: "2025-06-07", value: 869 },
      { date: "2025-06-08", value: 870 },
      { date: "2025-06-09", value: 872 },
      { date: "2025-06-10", value: 868.43 },
    ],
  },
};
