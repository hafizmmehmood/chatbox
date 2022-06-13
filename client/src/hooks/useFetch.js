import { useState, useEffect, useCallback } from 'react';

const useFetch = (getAllData, id = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAll = useCallback(async () => {
    setLoading(true);
    const response = id ? await getAllData(id) : await getAllData();
    if (response.status === 200) {
      setData(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [getAllData, id]);

  useEffect(() => {
    getAll();
    return () => {
      setData([]);
    };
  }, [getAll]);

  const refreshData = () => {
    getAll();
  };

  return { data, loading, setData, refreshData };
};

export default useFetch;
