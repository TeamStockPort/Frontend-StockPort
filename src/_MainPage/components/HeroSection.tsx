import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "@/_MainPage/mocks/heroContent";
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center px-4 py-10 sm:py-20 md:py-32 text-center">
      <h1 className="px-4 font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight">
        {HERO_CONTENT.title.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h1>
      <p className="mt-4 sm:mt-6 px-4 max-w-2xl text-gray-300 text-base sm:text-lg">
        {/* 모바일 환경에서만 표시되는 텍스트 */}
        <span className="sm:hidden block">
          {"과거 시장 데이터를 기반으로\n당신의 투자 전략을 시뮬레이션하여\n수익률과 안정성을 미리 예측할 수 있습니다."
            .split("\n")
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </span>
        {/* 태블릿 이상 환경에서 표시되는 텍스트 */}
        <span className="hidden sm:block">
          {HERO_CONTENT.description.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </span>
      </p>
      <Button
        asChild
        size="lg"
        className="bg-blue-500 hover:bg-blue-600 mt-6 sm:mt-10 px-6 sm:px-9 py-4 sm:py-6 rounded-full text-white md:text-[1rem] text-sm sm:text-base"
      >
        <Link to="/backtest">
          {HERO_CONTENT.cta}
          <ArrowRight className="ml-1 w-4 sm:w-5 h-4 sm:h-5" />
        </Link>
      </Button>
    </div>
  );
}
