import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "@/_MainPage/mocks/heroContent";
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center py-20 sm:py-32 text-center">
      <h1 className="font-bold text-white text-4xl sm:text-6xl tracking-tight">
        {HERO_CONTENT.title.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h1>
      <p className="mt-6 max-w-2xl text-gray-300 text-lg">
        {HERO_CONTENT.description.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <Button
        asChild
        size="lg"
        className="bg-blue-500 hover:bg-blue-600 mt-10 px-9 py-6 rounded-full text-[1rem] text-white"
      >
        <Link to="/backtest">
          {HERO_CONTENT.cta}
          <ArrowRight className="ml-1 w-5 h-5" />
        </Link>
      </Button>
    </div>
  );
}
