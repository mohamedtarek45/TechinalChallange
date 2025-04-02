import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
export const queryClient = new QueryClient();
render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>,

  document.getElementById("app")
);
