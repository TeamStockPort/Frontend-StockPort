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
import { Card, CardContent } from "@/components/ui/card";
import { usePostBacktest } from "@/lib/hooks/usePostBacktest";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/_BacktestingPage/hooks/useProgress";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/apis/types";

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
  const { mutate, isPending, error, data } = usePostBacktest();
  const { progress, showResult } = useProgress({ isPending, data, error });

  const handleSubmit = form.handleSubmit((formData) => {
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

    const requestData = mapToBacktestRequest(formData, assets);
    mutate(requestData);
  });

  return (
    <div className="gap-6 px-18">
      <Title title="자산배분 백테스트"></Title>
      <Notice></Notice>
      <Card className="bg-white/5 mb-6 border-white/10 text-white">
        <BacktestForm form={form}></BacktestForm>
        <AssetAllocation
          assets={assets}
          setAssets={setAssets}
          totalWeight={totalWeight}
        ></AssetAllocation>
      </Card>
      <StartBacktestButton
        handleSubmit={handleSubmit}
        disabled={totalWeight !== 100 || isPending}
      ></StartBacktestButton>

      {/* 로딩 상태 또는 Progress 진행 중 */}
      {(isPending || (progress > 0 && progress < 100)) && (
        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent>
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-gray-300">백테스트를 수행 중입니다...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 에러 상태 */}
      {error && !isPending && progress === 0 && (
        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent>
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center gap-2">
                <p className="font-semibold text-red-400 text-xl">
                  백테스트 수행 중 오류가 발생했습니다
                </p>
                <p className="text-red-300 text-center">
                  {error instanceof Error
                    ? error.message
                    : (error as AxiosError<ApiErrorResponse>).response?.data?.detail ||
                      "알 수 없는 오류가 발생했습니다."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 성공 상태 - Progress가 100%가 되고 showResult가 true일 때만 렌더링 */}
      {showResult && !error && data?.isSuccess && data?.result && (
        <BacktestResult data={data.result}></BacktestResult>
      )}
    </div>
  );
};

export default BacktestingPage;
