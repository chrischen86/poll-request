import { QueryClient } from "@tanstack/react-query";

const defaultQueryConfig = {
  staleTime: 60000,
  refetchOnWindowFocus: true,
  retry: false
};

const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});

export default queryClient;
