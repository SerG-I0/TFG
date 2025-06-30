import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function PaginationButtons({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="pagination-buttons">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
      >
        <FaArrowLeft style={{ verticalAlign: 'middle', marginRight: 6 }} />
        Anterior
      </button>

      <span style={{ margin: '0 10px' }}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        Siguiente
        <FaArrowRight style={{ verticalAlign: 'middle', marginLeft: 6 }} />
      </button>
    </div>
  );
}

export default PaginationButtons;
