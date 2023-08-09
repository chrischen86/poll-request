import { useMutation, useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;
const POLL_QUERYKEY = "poll";

export const usePollById = (pollId) => {
  return useQuery({
    queryKey: [POLL_QUERYKEY],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/poll/${pollId}`, {
        method: "GET",
      });

      console.log(response);
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      return response.json();
    },
  });
};

export const useCreatePoll = () => {
  return useMutation({
    mutationFn: (formData) => {
      return fetch(`${API_URL}/poll`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
  });
};
