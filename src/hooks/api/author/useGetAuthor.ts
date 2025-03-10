"use client";
import { Author } from "@/types/author";
import { BASE_URL_API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAuthor = (slug: string) => {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: async () => {
      const { data } = await axios.get<Author[]>(
        `${BASE_URL_API}/data/author?where=%60slug%60%20%3D%20'${slug}'&loadRelations=blogs`,
      );
      return data;
    },
  });
};

export default useGetAuthor;
