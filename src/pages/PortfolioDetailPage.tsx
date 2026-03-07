import { useParams, useNavigate } from "react-router-dom";
import { useBacktestDetail, useDeleteBacktest } from "@/lib/hooks/useBacktestStorage";
import BacktestResult from "@/_BacktestingPage/components/BacktestResult";
import Title from "@/components/Title";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PortfolioDetailPage = () => {
  const { backtestId } = useParams<{ backtestId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useBacktestDetail(backtestId ?? "");
  const { mutate: deleteBacktest, isPending: isDeleting } = useDeleteBacktest();

  const handleDelete = () => {
    if (!backtestId || !confirm("정말 삭제하시겠습니까?")) return;

    deleteBacktest(backtestId, {
      onSuccess: () => {
        toast.success("삭제되었습니다.");
        navigate("/portfolio");
      },
      onError: () => toast.error("삭제에 실패했습니다."),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-red-500 text-xl">데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className="gap-6 mb-20 px-6 md:px-18">
      <div className="flex justify-between items-center">
        <Title title={data.title} />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/portfolio")}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="mr-1 w-4 h-4" />
            목록
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-400 cursor-pointer"
          >
            <Trash2 className="mr-1 w-4 h-4" />
            삭제
          </Button>
        </div>
      </div>

      <div className="mb-4 text-gray-400 text-sm">
        {data.request.startDate} ~ {data.request.endDate} | 초기 투자금:{" "}
        {data.request.initialCapital.toLocaleString()}원 | 리밸런싱: {data.request.rebalanceCycle}
      </div>

      <BacktestResult data={data.result} />
    </div>
  );
};

export default PortfolioDetailPage;
