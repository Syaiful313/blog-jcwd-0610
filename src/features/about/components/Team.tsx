"use client";
import useGetAuthors from "@/hooks/api/author/useGetAuthors";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import TeamSkeleton from "./TeamSkeleton";

const Team: FC = () => {
  const { data = [], isPending } = useGetAuthors();

  if (isPending) {
    return <TeamSkeleton/>
  }

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
        Meet Our Team
      </h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {data.map((author, index) => (
          <div
            id={author.objectId}
            key={index}
            className="flex flex-col items-center rounded-lg border border-gray-100 p-4 text-center shadow-sm transition-shadow duration-200 hover:shadow-md sm:flex-row sm:items-start sm:space-x-4 sm:text-left dark:border-gray-800"
          >
            <div className="mb-3 flex-shrink-0 sm:mb-0">
              <Image
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
                priority={true}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold sm:text-xl">{author.name}</h3>
              <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                {author.role}
              </p>
              <p className="text-xs sm:text-sm">{author.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
