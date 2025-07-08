import React from 'react';

const getSortedData = (data, sortConfig) => {
  if (!sortConfig) return data;
  const sorted = [...data].sort((a, b) => {
    const valA = a[sortConfig.key].toString().toLowerCase();
    const valB = b[sortConfig.key].toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

const DashboardTable = ({ data, sortConfig, setSortConfig, currentPage, pageSize }) => {
  const start = (currentPage - 1) * pageSize;
  const currentData = getSortedData(data, sortConfig).slice(start, start + pageSize);

  const handleSort = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig(null);
    }
  };

  const getSortSymbol = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th onClick={() => handleSort('postId')}>Post ID {getSortSymbol('postId')}</th>
          <th onClick={() => handleSort('name')}>Name {getSortSymbol('name')}</th>
          <th onClick={() => handleSort('email')}>Email {getSortSymbol('email')}</th>
          <th>Comment</th>
        </tr>
      </thead>

      <tbody>
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
            </tr>
          ))
        ) : (
         <tr>
            <td colSpan="4" style={{
              padding: '60px 0',
              textAlign: 'center',
              color: '#888',
              fontSize: '16px',
              height: '200px',
              width:"100vw"
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🔍</span>
                <span>No results found</span>
              </div>
            </td>
          </tr>

        )}
      </tbody>
    </table>
  );
};

export default DashboardTable;
