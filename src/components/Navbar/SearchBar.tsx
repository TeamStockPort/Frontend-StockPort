import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative flex justify-center items-center mr-4 w-full max-w-xl">
      <Search className="top-1/2 left-4 absolute mr-1.5 text-gray-400 -translate-y-1/2" size={20} />
      <Input
        type="text"
        placeholder="종목명/종목코드 검색"
        className="pl-10 border-2 border-gray-400/50 focus:border-white rounded-4xl h-13 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
