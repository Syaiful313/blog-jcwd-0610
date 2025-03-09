import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const TeamSkeleton: FC = () => {
  // Create an array of 4 items to map through for skeleton placeholders
  const skeletonItems = Array(4).fill(null);

  return (
    <section className="mb-8 sm:mb-12">
      <Skeleton className="mb-4 h-8 w-48" />
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border border-gray-100 p-4 text-center shadow-sm sm:flex-row sm:items-start sm:space-x-4 sm:text-left dark:border-gray-800"
          >
            <div className="mb-3 flex-shrink-0 sm:mb-0">
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
            <div className="w-full">
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSkeleton;