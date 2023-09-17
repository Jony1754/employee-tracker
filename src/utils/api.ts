/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';

const useApiData = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData(result);
        console.log(`Result from api at url ${endpoint} :`, result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, refetchTrigger]);

  return { data, error, loading, refetch };
};

export default useApiData;
