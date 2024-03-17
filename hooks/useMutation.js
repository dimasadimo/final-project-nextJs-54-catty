import { useCallback, useState } from "react";

export const useMutation = () => {
  const [data, setData] = useState({
  data: null,
  isLoading: false,
  isError: false,
}); 

const mutate = useCallback(
  async ({ url = "", method = "POST", payload = {}, headers = {} } = {}) => {
    setData({
      ...data,
      data: null,
      isLoading: true,
    });
    try {
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          ...headers
        },
        ...(method !== 'GET' && { body: JSON.stringify(payload) }),
      });
      const result = await response.json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      });
      return { ...result, status: response?.status };
    } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false,
      });
      return error;
    }
  }, []);
    
  return { ...data, mutate };
};