import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 pb-8">
      <button
        className="disabled:opacity-50 px-3 py-2 border border-gray-700 rounded-md text-white cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((number) => (
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
