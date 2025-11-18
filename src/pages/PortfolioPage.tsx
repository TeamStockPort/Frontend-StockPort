import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowRight, ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioPage = () => {
  return (
    // TODO: 데이터가 있다면 바로가기 리스트를 보여준다.
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ChartNoAxesCombined />
          </EmptyMedia>
          <EmptyTitle className="mb-2 text-3xl">포트폴리오가 없습니다 :&#40;</EmptyTitle>
          <EmptyDescription className="text-gray-300">
            <p>아직 수행한 백테스팅이 없어요.</p>
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
};

export default PortfolioPage;
