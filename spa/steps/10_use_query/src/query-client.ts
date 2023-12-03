import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Verhindert das Refetching wenn das Browser-Fenster erneut fokussiert wird
      // In einer echten Anwendung kann das sinnvoll sein, beim
      // Lernen und Ausprobieren von TanStack Query finde ich es aber eher
      // verwirrend
      refetchOnWindowFocus: false,
    },
  },
});

export { queryClient };
