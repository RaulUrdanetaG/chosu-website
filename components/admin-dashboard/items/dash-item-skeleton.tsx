"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashItemSkeleton() {
  return (
    <div className="flex flex-col p-2 shadow-lg rounded-md">
      <div className="flex justify-center items-center h-[200px]">
        <Skeleton className="w-full h-full rounded-md bg-zinc-300" />
      </div>
      <Skeleton className="w-full h-4 mt-2 bg-zinc-300" />
      <Skeleton className="w-[150px] h-4 mt-2 bg-zinc-300" />

      <Skeleton className="w-[70px] h-4 mt-2 bg-zinc-300" />
      <Skeleton className="w-[150px] h-[65px] mt-2 bg-zinc-300" />

      <Skeleton className="w-full h-[32px] mt-[7px] bg-zinc-300" />
    </div>
  );
}

export function DashItemSkeletonGrid() {
  return (
    <div className="items-grid">
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
      <DashItemSkeleton />
    </div>
  );
}
