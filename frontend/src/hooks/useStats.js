import { useState, useEffect } from "react";
import { getGameStats } from "../services/api";

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const statsData = await getGameStats();
      setStats(statsData);
    } catch (err) {
      console.log(`Error loading game stats: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    isLoading,
    loadStats,
  };
};