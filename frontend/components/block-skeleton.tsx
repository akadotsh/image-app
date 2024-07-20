import { cn } from "@/lib/utils";

export const BlockSkeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={cn("animate-pulse bg-gray-300 w-14 h-8 rounded-sm", className)}
    ></div>
  );
};
