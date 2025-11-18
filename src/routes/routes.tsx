import { type RouteObject } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { MainPage, MarketsPage, MarketDetailPage, PortfolioPage, BacktestingPage } from "@/pages";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "markets", element: <MarketsPage /> },
      { path: "markets/:code", element: <MarketDetailPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "backtest", element: <BacktestingPage /> },
    ],
  },
];
