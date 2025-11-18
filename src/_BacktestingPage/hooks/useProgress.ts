import { useState, useEffect } from "react";

interface UseProgressProps {
  isPending: boolean;
  data: unknown;
  error: Error | null;
}

export const useProgress = ({ isPending, data, error }: UseProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
    } else if (data && !error) {
      // 응답이 오면 100%로 진행
      timer3 = setTimeout(() => {
        setProgress(100);
        // 100%가 된 후 데이터 렌더링
        timer4 = setTimeout(() => {
          setShowResult(true);
        }, 350);
      }, 100);
    } else if (error) {
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
  }, [isPending, data, error]);

  return { progress, showResult };
};
