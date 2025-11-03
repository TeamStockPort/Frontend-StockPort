// 백엔드측 전송 양식을 맞추기 위해 formDataSchema -> BacktestRequest변한
import type { BacktestFormSchema } from "@/_BacktestingPage/utils/backtestFormSchema";
import type { Asset, BacktestRequest } from "@/_BacktestingPage/types/backtestFormType";

export function mapToBacktestRequest(values: BacktestFormSchema, assets: Asset[]): BacktestRequest {
  const formatDate = (date: Date) => date.toLocaleDateString("sv-SE");

  return {
    start_date: formatDate(values.startDate),
    end_date: formatDate(values.endDate),
    initial_amount: values.initialAmount,
    rebalance_frequency: values.rebalanceFrequency,
    assets: assets.map(({ name, ticker, weight }) => ({
      name,
      ticker,
      weight,
    })),
  };
}
