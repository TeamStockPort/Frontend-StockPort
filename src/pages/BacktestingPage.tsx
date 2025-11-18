import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "@/components/Title";
import Notice from "@/_BacktestingPage/components/Notice";
import BacktestForm from "@/_BacktestingPage/components/BacktestForm";
import AssetAllocation from "@/_BacktestingPage/components/AssetAllocation";
import StartBacktestButton from "@/_BacktestingPage/components/StartBacktestButton";
import {
  backtestFormSchema,
  type BacktestFormSchema,
} from "@/_BacktestingPage/utils/backtestFormSchema";
import { useState, useMemo } from "react";
import { mapToBacktestRequest } from "@/_BacktestingPage/utils/mapToRequest";
import { v4 as uuidv4 } from "uuid";
import BacktestResult from "@/_BacktestingPage/components/BacktestResult";
import { MOCK_BACKTEST_RESULT } from "@/constants/mockBacktest";

const BacktestingPage = () => {
  const [assets, setAssets] = useState([{ id: uuidv4(), name: "", ticker: "", weight: 0 }]);
  const totalWeight = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.weight, 0);
  }, [assets]);
  const form = useForm<BacktestFormSchema>({
    resolver: zodResolver(backtestFormSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      initialAmount: 1000,
      rebalanceFrequency: "매년",
    },
  });
  const handleSubmit = () => {
    const hasInvalidAsset = assets.some((asset) => {
      return !asset.name || !asset.ticker || asset.weight < 1 || asset.weight > 100;
    });

    if (hasInvalidAsset) {
      alert("모든 자산의 종목명, 티커, 비중을 올바르게 입력해주세요.");
      return;
    }

    if (totalWeight !== 100) {
      alert("비중의 합이 100%가 되어야 합니다.");
      return;
    }

    const formData = form.getValues();
    const requestData = mapToBacktestRequest(formData, assets);
    // TODO: 백테스트 API 호출 로직 추가
    const message = `
📊 백테스트 요청 데이터

시작일: ${requestData.start_date}
종료일: ${requestData.end_date}
초기금액: ${requestData.initial_amount} 만원
리밸런싱 주기: ${requestData.rebalance_frequency}

📈 자산 목록:
${requestData.assets
  .map(
    (asset, idx) => `  ${idx + 1}. 종목명: ${asset.name} (${asset.ticker}), 비중: ${asset.weight}%`
  )
  .join("\n")}
`;

    alert(message);
  };

  return (
    <div className="gap-2 px-18">
      <Title title="자산배분 백테스트"></Title>
      <Notice></Notice>
      <BacktestForm form={form}></BacktestForm>
      <AssetAllocation
        assets={assets}
        setAssets={setAssets}
        totalWeight={totalWeight}
      ></AssetAllocation>
      <StartBacktestButton
        handleSubmit={handleSubmit}
        disabled={totalWeight !== 100}
      ></StartBacktestButton>
      <BacktestResult data={MOCK_BACKTEST_RESULT}></BacktestResult>
    </div>
  );
};

export default BacktestingPage;
