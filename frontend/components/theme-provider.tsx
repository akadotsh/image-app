"use client";

import * as React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { TooltipProvider } from "@/components/ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </NextThemeProvider>
  );
}
