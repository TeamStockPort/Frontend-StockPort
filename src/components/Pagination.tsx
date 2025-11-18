interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 현재 페이지가 속한 5단위 그룹 계산
  const getVisiblePages = () => {
    const groupSize = 5;
    // 현재 페이지가 속한 그룹 번호 (1부터 시작)
    const groupNumber = Math.ceil(currentPage / groupSize);
    // 그룹의 시작 페이지
    const startPage = (groupNumber - 1) * groupSize + 1;
    // 그룹의 끝 페이지 (totalPages를 넘지 않도록)
    const endPage = Math.min(groupNumber * groupSize, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 pb-8">
      <button
        className="disabled:opacity-50 px-3 py-2 border border-gray-700 rounded-md text-white cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {visiblePages.map((number) => (
        <button
          key={number}
          className={`px-4 py-2 rounded-md ${
            currentPage === number
              ? "bg-white/10 text-white font-bold"
              : "text-gray-400 hover:bg-blue-950 cursor-pointer"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="disabled:opacity-50 px-3 py-2 border border-gray-700 rounded-md text-white cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
