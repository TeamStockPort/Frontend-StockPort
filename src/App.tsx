import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { routes } from "@/routes/routes";
import { __DEV__ } from "@/utils/instance";
import { Toaster } from "sonner";

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Router>
        <AppRoutes />
      </Router>
      {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
