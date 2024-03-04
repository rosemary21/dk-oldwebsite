import { usePropertyContext } from "../../../contexts/PropertyContext";

export default function Pagination({totalPost}: {totalPost: number}) {
  const { postPerPage, currentPage, setCurrentPage } = usePropertyContext();
  const pages = [];

  for (let i = 0; i < Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="mt-3 d-flex align-items-center gap-2 w-100 flex-wrap">
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(page + 1)}
          className={
            page + 1 === currentPage
              ? "pagination_btn active_pagination_btn"
              : "pagination_btn"
          }
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}
