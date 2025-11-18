import { useState, useEffect, useRef } from "react";
import type { SearchResult, Asset } from "@/_BacktestingPage/types/backtestFormType";
import { useGetSearchAssets } from "@/lib/hooks/useGetSearchAssets";
import { useDebounce } from "@/lib/hooks/useDebounce";
type AssetItemProps = {
  AssetIndex: number;
  asset: Asset;
  onUpdate: (updatedAsset: Asset) => void;
  onDelete: () => void;
};

const AssetItem = ({ AssetIndex, asset, onUpdate, onDelete }: AssetItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState(asset.name);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipSearchRef = useRef(false);
  const hasClearedRef = useRef(false);

  const debouncedQuery = useDebounce(query, 500);

  const { data: searchAssets } = useGetSearchAssets(debouncedQuery);

  const searchResults: SearchResult[] = searchAssets
    ? searchAssets.map((item) => ({
        name: item.stockName,
        ticker: item.stockCode,
      }))
    : [];

  // 검색 결과가 있을 때 드롭다운 열기
  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }
    if (searchResults.length > 0 && debouncedQuery) {
      setIsDropdownOpen(true);
    } else if (!debouncedQuery) {
      setIsDropdownOpen(false);
    }
  }, [searchResults, debouncedQuery]);

  const handleSelect = (selected: SearchResult) => {
    const displayValue = `${selected.name} (${selected.ticker})`;
    onUpdate({ ...asset, name: selected.name, ticker: selected.ticker });
    skipSearchRef.current = true;
    setQuery(displayValue);
    setIsDropdownOpen(false);
    hasClearedRef.current = false;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex items-center gap-4">
      <div className="w-20 font-medium text-gray-300 text-sm">자산 {AssetIndex + 1}</div>

      <input
        className="flex-1 bg-white/10 focus:bg-white/15 px-3 py-2 border border-white/20 focus:border-white/30 rounded-lg focus:outline-none h-10 text-white placeholder:text-gray-500 transition-colors"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          hasClearedRef.current = true; // 입력 중엔 다시 초기화 안되게
        }}
        placeholder="종목명 입력"
        onFocus={() => {
          if (!hasClearedRef.current && query.includes("(")) {
            setQuery("");
            setIsDropdownOpen(true);
            hasClearedRef.current = true;
          } else {
            if (searchResults.length > 0) setIsDropdownOpen(true);
          }
        }}
      />

      {isDropdownOpen && searchResults.length > 0 && (
        <div className="top-full left-20 z-20 absolute flex flex-col bg-white/95 shadow-xl backdrop-blur-sm mt-2 border border-white/20 rounded-lg w-[calc(100%-5rem)] max-h-[240px] overflow-y-auto">
          {searchResults.map((item) => (
            <div
              key={item.ticker}
              className="flex hover:bg-white/10 px-4 py-2 transition-colors cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              <span className="text-gray-900">{item.name}</span>
              <span className="ml-2 text-gray-600">({item.ticker})</span>
            </div>
          ))}
        </div>
      )}
      <input
        type="number"
        className="bg-white/10 focus:bg-white/15 px-3 py-2 border border-white/20 focus:border-white/30 rounded-lg focus:outline-none w-24 h-10 text-white placeholder:text-gray-500 transition-colors"
        value={asset.weight === 0 ? "" : asset.weight}
        onChange={(e) => {
          const newWeight = Math.max(0, Math.min(100, Number(e.target.value)));
          onUpdate({ ...asset, weight: newWeight });
        }}
        placeholder="비중(%)"
      />
      {AssetIndex !== 0 ? (
        <button
          className="flex justify-center items-center hover:bg-white/10 px-4 py-2 border border-white/20 rounded-lg h-10 text-white transition-colors"
          onClick={onDelete}
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default AssetItem;
