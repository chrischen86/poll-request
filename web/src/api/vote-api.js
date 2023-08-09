import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export const useVoteOnPoll = () => {
  return useMutation({
    mutationFn: (formData) => {
      return fetch(`${API_URL}/vote`, {
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
