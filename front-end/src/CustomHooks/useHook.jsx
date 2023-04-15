import { useState, useEffect } from 'react';
import axios from 'axios';

const useHook = (url) => {
  const [data, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get(url);
        setData1(data.data.cityCounts);
        setData2(data);
      } catch (error) {
        setError(error)
      }
      setLoading(false);
    }

    fetchData();
  }, [url]);

  const reFetchData = async () => {
    setLoading(true);
    try {
      const data = await axios.get(url);
      setData1(data.data);
      setData2(data.data);
    } catch (error) {
      setError(error)
    }
    setLoading(false);
  };

  return {data, data2, loading, error, reFetchData}
};


export default useHook;