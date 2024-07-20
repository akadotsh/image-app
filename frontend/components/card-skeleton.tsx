"use client";

import { cn } from "@/lib/utils";

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer h-[240px] animate-pulse bg-gray-300",
        className
      )}
    ></div>
  );
};
