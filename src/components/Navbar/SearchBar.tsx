import type { SearchResult } from "@/_BacktestingPage/types/backtestFormType";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useGetSearchAssets } from "@/lib/hooks/useGetSearchAssets";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchAssets } = useGetSearchAssets(debouncedQuery);

  const searchResults: SearchResult[] = searchAssets
    ? searchAssets.map((item) => ({
        name: item.stockName,
        ticker: item.stockCode,
      }))
    : [];

  // SearchBar 클릭 시 overlay 열기
  const handleSearchBarClick = () => {
    setIsOverlayOpen(true);
  };

  // overlay 외부 클릭 시 닫기 및 검색어 초기화
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayContentRef.current && !overlayContentRef.current.contains(e.target as Node)) {
      setIsOverlayOpen(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (isOverlayOpen) {
      // overlay가 열려있을 때 body 스크롤 방지
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOverlayOpen]);

  const handleSelect = (selected: SearchResult) => {
    setQuery("");
    setIsOverlayOpen(false);
    navigate(`/markets/${selected.ticker}`);
  };

  return (
    <>
      {/* 기본 SearchBar */}
      <div
        ref={wrapperRef}
        className="relative flex justify-center items-center mr-4 w-full max-w-xl"
        onClick={handleSearchBarClick}
      >
        <Search
          className="top-1/2 left-4 z-10 absolute mr-1.5 text-gray-400 -translate-y-1/2"
          size={20}
        />
        <Input
          type="text"
          value=""
          placeholder="종목명/종목코드 검색"
          className="pl-10 border-2 border-gray-400/50 focus:border-white rounded-4xl h-13 transition-all duration-200 cursor-pointer"
          readOnly
        />
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div
          className="z-[9999] fixed inset-0 bg-black/10 backdrop-blur-xs"
          onClick={handleOverlayClick}
        >
          <div className="flex flex-col items-center mt-20 w-full">
            {/* 검색바와 리스트를 감싸는 컨테이너 */}
            <div ref={overlayContentRef} className="flex flex-col w-[600px]">
              {/* Overlay 내 SearchBar */}
              <div className="relative flex items-center w-full">
                <Search
                  className="top-1/2 left-4 z-10 absolute mr-1.5 text-gray-400 -translate-y-1/2"
                  size={20}
                />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="종목명/종목코드 검색"
                  className="bg-white/95 backdrop-blur-xs pl-10 border-2 border-white rounded-4xl w-full h-14 text-navy text-lg transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* 검색 결과 리스트 */}
              {searchResults.length > 0 && debouncedQuery && (
                <div className="flex flex-col bg-white shadow-2xl backdrop-blur-md mt-4 border border-gray-100/50 rounded-2xl w-full max-h-[60vh] overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {searchResults.map((item) => (
                      <div
                        key={item.ticker}
                        className="group flex items-center hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 px-6 py-4 border-gray-50/80 border-b last:border-b-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 group-hover:from-blue-200 to-indigo-100 group-hover:to-indigo-200 mr-4 rounded-xl w-10 h-10 transition-all duration-200">
                          <span className="font-semibold text-blue-600 text-sm">
                            {item.ticker.slice(-2)}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-700 text-base truncate transition-colors">
                            {item.name}
                          </span>
                          <span className="mt-0.5 font-medium text-gray-500 text-xs">
                            {item.ticker}
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 ml-4 transition-opacity">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
