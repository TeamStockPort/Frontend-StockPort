import { useState, useEffect } from "react";
import type { ApiResponse } from "@/lib/apis/types";

interface UseProgressProps {
  isPending: boolean;
  data: unknown;
  error: Error | null;
}

export const useProgress = ({ isPending, data, error }: UseProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // data가 ApiResponse 형식이고 isSuccess가 false인지 확인
  const isErrorResponse =
    data && typeof data === "object" && "isSuccess" in data && data.isSuccess === false;

  // Progress 진행률 관리
  useEffect(() => {
    let timer1: NodeJS.Timeout | null = null;
    let timer2: NodeJS.Timeout | null = null;
    let timer3: NodeJS.Timeout | null = null;
    let timer4: NodeJS.Timeout | null = null;

    if (isPending) {
      // 초기화
      setProgress(0);
      setShowResult(false);

      // 33%까지 300ms 동안 진행
      timer1 = setTimeout(() => {
        setProgress(33);
      }, 100);

      // 66%까지 진행 (응답 대기)
      timer2 = setTimeout(() => {
        setProgress(66);
      }, 500);
    } else if (data && !error && !isErrorResponse) {
      // 응답이 오고 에러가 아니며 isSuccess가 true인 경우에만 100%로 진행
      const apiData = data as ApiResponse<unknown>;
      if (apiData.isSuccess !== false) {
        timer3 = setTimeout(() => {
          setProgress(100);
          // 100%가 된 후 데이터 렌더링
          timer4 = setTimeout(() => {
            setShowResult(true);
          }, 350);
        }, 100);
      }
    } else if (error || isErrorResponse) {
      // 에러 발생 시 progress 초기화
      setProgress(0);
      setShowResult(false);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      if (timer3) clearTimeout(timer3);
      if (timer4) clearTimeout(timer4);
    };
  }, [isPending, data, error, isErrorResponse]);

  return { progress, showResult };
};
