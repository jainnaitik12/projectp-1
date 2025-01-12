
import { useState, useEffect } from 'react';

export const useJNF = () => {
  const [jnfs, setJnfs] = useState([]);

  useEffect(() => {
    // Fetch JNFs from an API or database
    const fetchJNFs = async () => {
      // Replace with actual API call
      const response = await fetch('/api/jnfs');
      const data = await response.json();
      setJnfs(data);
    };

    fetchJNFs();
  }, []);

  const getJNFs = () => {
    return jnfs;
  };

  return { getJNFs };
};