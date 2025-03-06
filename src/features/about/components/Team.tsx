import { authors } from "@/lib/data";
import Image from "next/image";
import React from "react";

const Team = () => {
  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Meet Our Team</h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {authors.map((author) => (
          <div
            key={author.id}
            className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:space-x-4 sm:text-left border border-gray-100 dark:border-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0 mb-3 sm:mb-0">
              <Image
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
                priority={true}
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">{author.name}</h3>
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