// Import styles, initialize component theme here.
// import '../src/common.css';
import "../src/index.css";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

beforeMount(async ({ App }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
