"use client";
import  { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface TanstackProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

function TanstackQueryProvider({ children }: TanstackProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default TanstackQueryProvider;
