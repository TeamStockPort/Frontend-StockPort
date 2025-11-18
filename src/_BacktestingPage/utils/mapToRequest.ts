// 백엔드측 전송 양식을 맞추기 위해 formDataSchema -> BacktestRequest변한
import type { BacktestFormSchema } from "@/_BacktestingPage/utils/backtestFormSchema";
import type { Asset, BacktestRequest } from "@/_BacktestingPage/types/backtestFormType";

export function mapToBacktestRequest(values: BacktestFormSchema, assets: Asset[]): BacktestRequest {
  const formatDate = (date: Date) => date.toLocaleDateString("sv-SE");

  // 리밸런싱 주기를 영어로 변환
  const rebalanceCycleMap: Record<"매년" | "분기별" | "매월", "YEARLY" | "QUARTERLY" | "MONTHLY"> = {
    매년: "YEARLY",
    분기별: "QUARTERLY",
    매월: "MONTHLY",
  };

  return {
    startDate: formatDate(values.startDate),
    endDate: formatDate(values.endDate),
    initialCapital: values.initialAmount * 10000, // 만원 단위를 원 단위로 변환
    rebalanceCycle: rebalanceCycleMap[values.rebalanceFrequency],
    assets: assets.map(({ ticker, weight }) => ({
      stockCd: ticker,
      weight,
    })),
  };
}
