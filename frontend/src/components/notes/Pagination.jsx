import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="btn btn-ghost"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft size={18} />
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`btn btn-ghost ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-ghost"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
