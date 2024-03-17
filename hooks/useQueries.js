import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "", headers = {}, dependencies = false } = {},) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  }); 

  const fetchingData = useCallback(async ({ url = "", method = "GET", headers = {} } = {}) => {
    try {
      setData({
        ...data,
        data: null,
        isLoading: true,
        isError: false,
      });
      const response = await fetch(url, { method, headers: {...headers} });
      const result = await response.json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      });
      } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false,
      });
    };
  }, []);
    
  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl, headers });
    }
  }, [dependencies]); 
    
  return { ...data };
};