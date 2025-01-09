import { useState, useCallback } from 'react';

export const useTable = (fetchData) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchData({
        page: pagination.page + 1,
        limit: pagination.rowsPerPage,
      });
      
      setData(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.total,
      }));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, pagination.page, pagination.rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setPagination(prev => ({
      ...prev,
      page: 0,
      rowsPerPage: newRowsPerPage,
    }));
  };

  return {
    data,
    loading,
    pagination,
    loadData,
    handlePageChange,
    handleRowsPerPageChange,
  };
};