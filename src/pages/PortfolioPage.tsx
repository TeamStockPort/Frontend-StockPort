import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowRight, ChartNoAxesCombined, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Title from "@/components/Title";
import { useAuth } from "@/lib/hooks/useAuth";
import { useBacktestList, useDeleteBacktest } from "@/lib/hooks/useBacktestStorage";
import { Spinner } from "@/components/ui/spinner";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";

const PortfolioPage = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: backtests, isLoading, error } = useBacktestList();
  const { mutate: deleteBacktest } = useDeleteBacktest();
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("정말 삭제하시겠습니까?")) return;

    deleteBacktest(id, {
      onSuccess: () => toast.success("삭제되었습니다."),
      onError: () => toast.error("삭제에 실패했습니다."),
    });
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartNoAxesCombined />
            </EmptyMedia>
            <EmptyTitle className="mb-2 text-3xl">로그인이 필요합니다</EmptyTitle>
            <EmptyDescription className="text-gray-300">
              <p>로그인하면 저장한 백테스트 결과를 확인할 수 있어요.</p>
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              size="lg"
              className="hover:opacity-80 mt-1 px-9 py-6 rounded-3xl text-[1rem] text-navy hover:text-navy-hover"
              asChild
            >
              <Link to="/login">로그인하기</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-red-500 text-xl">데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  if (!backtests || backtests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartNoAxesCombined />
            </EmptyMedia>
            <EmptyTitle className="mb-2 text-3xl">포트폴리오가 없습니다 :(</EmptyTitle>
            <EmptyDescription className="text-gray-300">
              <p>아직 저장한 백테스팅이 없어요.</p>
              <p>아래 버튼을 통해 백테스팅을 수행해보세요.</p>
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              size="lg"
              className="hover:opacity-80 mt-1 px-9 py-6 rounded-3xl text-[1rem] text-navy hover:text-navy-hover"
              asChild
            >
              <Link to="/backtest">
                백테스팅 시작하기
                <ArrowRight className="ml-1 w-5 h-5" />
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 min-h-screen font-sans text-white">
      <Title title="내 포트폴리오" />

      <main>
        <table className="w-full text-white border-collapse table-fixed">
          <thead>
            <tr className="border-white/10 border-b">
              <th className="p-4 w-12 font-normal text-gray-400 text-sm text-left">#</th>
              <th className="p-4 font-normal text-gray-400 text-sm text-left">포트폴리오명</th>
              <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">투자금</th>
              <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">최종자산</th>
              <th className="p-4 w-28 font-normal text-gray-400 text-sm text-left">CAGR</th>
              <th className="p-4 w-32 font-normal text-gray-400 text-sm text-left">생성일</th>
              <th className="p-4 w-16 font-normal text-gray-400 text-sm text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
            {backtests.map((item, index) => {
              const summary = item.result.portfolioSummary;
              const cagrClass =
                summary.cagr > 0
                  ? "text-red-500"
                  : summary.cagr < 0
                    ? "text-blue-500"
                    : "text-white";

              return (
                <tr
                  key={item.id}
                  className="hover:bg-white/5 border-white/10 border-b cursor-pointer"
                  onClick={() => navigate(`/portfolio/${item.id}`)}
                >
                  <td className="p-4 text-gray-400 align-middle">{index + 1}</td>
                  <td className="p-4 align-middle">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-gray-400 text-sm">
                      {item.request.startDate} ~ {item.request.endDate}
                    </div>
                  </td>
                  <td className="p-4 align-middle">{formatNumber(summary.initialCapital)}원</td>
                  <td className="p-4 align-middle font-bold">
                    {formatNumber(summary.finalCapital)}원
                  </td>
                  <td className={`p-4 align-middle font-bold ${cagrClass}`}>
                    {summary.cagr > 0 ? "+" : ""}
                    {summary.cagr.toFixed(2)}%
                  </td>
                  <td className="p-4 text-gray-400 align-middle">
                    {new Date(item.created_at).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="p-4 text-center align-middle">
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="hover:text-red-400 text-gray-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PortfolioPage;
