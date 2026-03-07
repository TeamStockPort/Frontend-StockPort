import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSaveBacktest } from "@/lib/hooks/useBacktestStorage";
import type { BacktestRequest, BacktestResult } from "@/_BacktestingPage/types/backtestFormType";
import { toast } from "sonner";

interface SaveBacktestButtonProps {
  request: BacktestRequest;
  result: BacktestResult;
}

const SaveBacktestButton = ({ request, result }: SaveBacktestButtonProps) => {
  const { user } = useAuth();
  const { mutate: save, isPending } = useSaveBacktest();
  const [showTooltip, setShowTooltip] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!user) return;

    const count = Date.now().toString(36).slice(-4);
    const title = `${user.id.slice(0, 8)}의 포트폴리오 ${count}`;

    save(
      { title, request, result },
      {
        onSuccess: () => {
          toast.success("백테스트 결과가 저장되었습니다.");
          setSaved(true);
        },
        onError: () => {
          toast.error("저장에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="relative flex justify-center mt-8">
      <div
        onMouseEnter={() => !user && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Button
          onClick={handleSave}
          disabled={!user || isPending || saved}
          className="flex items-center gap-2 bg-white hover:brightness-85 px-8 py-4 text-navy cursor-pointer disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {saved ? "저장 완료" : isPending ? "저장 중..." : "포트폴리오에 저장"}
        </Button>
      </div>

      {showTooltip && !user && (
        <div className="bottom-full left-1/2 absolute bg-gray-800 mb-2 px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap -translate-x-1/2">
          로그인하면 백테스트 결과를 저장할 수 있어요
          <div className="top-full left-1/2 absolute border-t-gray-800 border-x-transparent border-x-4 border-t-4 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

export default SaveBacktestButton;
