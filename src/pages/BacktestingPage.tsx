import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "@/components/Title";
import Notice from "@/_BacktestingPage/components/Notice";
import BacktestForm from "@/_BacktestingPage/components/BacktestForm";
import AssetAllocation from "@/_BacktestingPage/components/AssetAllocation";
// import StartBacktestButton from "@/_BacktestingPage/components/StartBacktestButton";
import {
  backtestFormSchema,
  type BacktestFormSchema,
} from "@/_BacktestingPage/utils/backtestFormSchema";
import { useState, useMemo, useRef, useEffect } from "react";
// import { mapToBacktestRequest } from "@/_BacktestingPage/utils/mapToRequest";
import { v4 as uuidv4 } from "uuid";
import BacktestResult from "@/_BacktestingPage/components/BacktestResult";
import SaveBacktestButton from "@/_BacktestingPage/components/SaveBacktestButton";
import type {
  BacktestRequest,
  BacktestResult as BacktestResultType,
} from "@/_BacktestingPage/types/backtestFormType";
import { Card } from "@/components/ui/card";
// import { CardContent } from "@/components/ui/card";
// import { usePostBacktest } from "@/lib/hooks/usePostBacktest";
// import { Progress } from "@/components/ui/progress";
// import { useProgress } from "@/_BacktestingPage/hooks/useProgress";
// import type { AxiosError } from "axios";
// import type { ApiErrorResponse } from "@/lib/apis/types";
import { MOCK_BACKTEST_REQUEST, MOCK_BACKTEST_RESULT } from "@/constants/mockBacktest";
import { Button } from "@/components/ui/button";

const BacktestingPage = () => {
  const [assets, setAssets] = useState([{ id: uuidv4(), name: "", ticker: "", weight: 0 }]);
  const totalWeight = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.weight, 0);
  }, [assets]);
  const form = useForm<BacktestFormSchema>({
    resolver: zodResolver(backtestFormSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      initialAmount: 1000,
      rebalanceFrequency: "매년",
    },
  });

  // --- 목데이터 모드 ---
  const [lastRequest, setLastRequest] = useState<BacktestRequest | null>(null);
  const [mockResult, setMockResult] = useState<BacktestResultType | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mockResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [mockResult]);

  const handleMockBacktest = () => {
    setLastRequest(MOCK_BACKTEST_REQUEST);
    setMockResult(MOCK_BACKTEST_RESULT);
  };

  // --- 실제 API 모드 (백엔드 연결 시 주석 해제) ---
  // const { mutate, isPending, error, data } = usePostBacktest();
  // const { progress, showResult } = useProgress({ isPending, data, error });
  // const buttonRef = useRef<HTMLDivElement>(null);
  // const errorRef = useRef<HTMLDivElement>(null);
  //
  // const hasError = error || (data && data.isSuccess === false);
  // const errorMessage = error
  //   ? error instanceof Error
  //     ? error.message
  //     : (error as AxiosError<ApiErrorResponse>).response?.data?.detail ||
  //       "알 수 없는 오류가 발생했습니다."
  //   : data && data.isSuccess === false
  //     ? data.message || "백테스트 수행 중 오류가 발생했습니다."
  //     : "";
  //
  // useEffect(() => {
  //   if (showResult && resultRef.current) {
  //     setTimeout(() => {
  //       resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 100);
  //   } else if (hasError && !isPending && errorRef.current) {
  //     setTimeout(() => {
  //       errorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 100);
  //   }
  // }, [showResult, hasError, isPending]);
  //
  // const handleSubmit = form.handleSubmit((formData) => {
  //   if (buttonRef.current) {
  //     buttonRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  //   const hasInvalidAsset = assets.some((asset) => {
  //     return !asset.name || !asset.ticker || asset.weight < 1 || asset.weight > 100;
  //   });
  //   if (hasInvalidAsset) {
  //     alert("모든 자산의 종목명, 티커, 비중을 올바르게 입력해주세요.");
  //     return;
  //   }
  //   if (totalWeight !== 100) {
  //     alert("비중의 합이 100%가 되어야 합니다.");
  //     return;
  //   }
  //   const requestData = mapToBacktestRequest(formData, assets);
  //   setLastRequest(requestData);
  //   mutate(requestData);
  // });

  return (
    <div className="gap-6 mb-20 px-18">
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

      {/* 목데이터 버튼 (백엔드 연결 시 아래 주석 해제하고 이 버튼 제거) */}
      <div className="flex justify-center items-center mb-6">
        <Button
          onClick={handleMockBacktest}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl px-8 py-6 border-0 rounded-xl font-semibold text-base text-white transition-all duration-200 cursor-pointer"
        >
          백테스트 시작 (삼성전자 60% + SK하이닉스 40%, 5년)
        </Button>
      </div>

      {/* 실제 API 버튼 (백엔드 연결 시 주석 해제) */}
      {/* <div ref={buttonRef}>
        <StartBacktestButton
          handleSubmit={handleSubmit}
          disabled={totalWeight !== 100 || isPending}
        ></StartBacktestButton>
      </div> */}

      {/* 실제 API 로딩 상태 (백엔드 연결 시 주석 해제) */}
      {/* {(isPending || (progress > 0 && progress < 100)) && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <Card className="bg-white/10 mx-4 border-white/20 w-full max-w-md text-white">
            <CardContent>
              <div className="flex justify-center items-center py-16">
                <div className="flex flex-col items-center gap-4 w-full">
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-gray-300">백테스트를 수행 중입니다...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* 실제 API 에러 상태 (백엔드 연결 시 주석 해제) */}
      {/* {hasError && !isPending && progress === 0 && (
        <div ref={errorRef}>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent>
              <div className="flex justify-center items-center py-16">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold text-red-400 text-xl">
                    백테스트 수행 중 오류가 발생했습니다
                  </p>
                  <p className="text-red-300 text-center">{errorMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* 목데이터 결과 */}
      {mockResult && lastRequest && (
        <div ref={resultRef}>
          <BacktestResult data={mockResult}></BacktestResult>
          <SaveBacktestButton request={lastRequest} result={mockResult} />
        </div>
      )}

      {/* 실제 API 결과 (백엔드 연결 시 주석 해제하고 위 목데이터 결과 제거) */}
      {/* {showResult && !error && data?.isSuccess && data?.result && (
        <div ref={resultRef}>
          <BacktestResult data={data.result}></BacktestResult>
          {lastRequest && <SaveBacktestButton request={lastRequest} result={data.result} />}
        </div>
      )} */}
    </div>
  );
};

export default BacktestingPage;
