"use client";

interface PaginationProps {
  currPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getMaxVisiblePages = (): number => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return 3; // Mobile (sm)
    } else if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 4; // Tablet (md)
    } else {
      return 5; // Desktop (lg+)
    }
  };

  const maxVisiblePages = getMaxVisiblePages();
  const pageArray: React.ReactNode[] = [];

  let startPage = Math.max(1, currPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageArray.push(
      <button
        key={`productPage-${i}`}
        className={`btn btn-ghost join-item btn-md text-lg ${currPage === i ? "text-goOnBlue underline" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>,
    );
  }

  if (startPage > 1) {
    pageArray.unshift(
      <button
        key="start-ellipsis"
        className="btn btn-disabled btn-ghost join-item btn-md text-lg"
      >
        ...
      </button>,
    );
    pageArray.unshift(
      <button
        key="start-page"
        className="btn btn-ghost join-item btn-md text-lg"
        onClick={() => onPageChange(1)}
      >
        1
      </button>,
    );
  }

  if (endPage < totalPages) {
    pageArray.push(
      <button
        key="end-ellipsis"
        className="btn btn-disabled btn-ghost join-item btn-md text-lg"
      >
        ...
      </button>,
    );
    pageArray.push(
      <button
        key="end-page"
        className="btn btn-ghost join-item btn-md text-lg"
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>,
    );
  }

  return <div className="join">{pageArray}</div>;
}
