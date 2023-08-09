import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
const RESULTS_QUERYKEY = "results";

export const usePollResultsById = (pollId) => {
  return useQuery({
    queryKey: [RESULTS_QUERYKEY, pollId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/view/${pollId}`, {
        method: "GET",
      });
      
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      return response.json();
    },
    refetchInterval: 1000,
    retry: true
  });
};