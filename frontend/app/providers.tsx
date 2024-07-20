"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";
import StoreProvider, { GlobalUserProvider } from "./StoreProvider";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalUserProvider>{children}</GlobalUserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
