import { type RouteObject } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { MainPage, MarketsPage, MarketDetailPage, PortfolioPage, BacktestingPage } from "@/pages";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
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
