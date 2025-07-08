import React, { useState, useEffect } from 'react';

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const buttonsToShow = 5;

  const [start, setStart] = useState(1);

  useEffect(() => {
    if (currentPage < start) {
      setStart(currentPage);
    } else if (currentPage >= start + buttonsToShow) {
      setStart(currentPage - buttonsToShow + 1);
    }
  }, [currentPage]);

  const end = Math.min(start + buttonsToShow - 1, totalPages);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div style={{ marginTop: '20px',marginBottom:"20px", display: 'flex', gap: '10px', flexWrap: 'wrap' , alignItems:'center',justifyContent:"center" }}>
      <button
        onClick={() => {
          if (start > 1) {
            setStart(start - 1);
            onPageChange(Math.max(currentPage - 1, 1));
          }
        }}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '6px 12px',
            backgroundColor: page === currentPage ? '#4CAF50' : '#eee',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => {
          if (start + buttonsToShow - 1 < totalPages) {
            setStart(start + 1);
            onPageChange(Math.min(currentPage + 1, totalPages));
          }
        }}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
