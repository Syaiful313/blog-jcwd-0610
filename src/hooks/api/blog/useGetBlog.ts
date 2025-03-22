"use client";
import { Blog } from "@/types/blog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await axios.get<Blog[]>(
        `${BASE_URL_API}/data/blogs?where=%60slug%60%20%3D%20'${slug}'&loadRelations=author&loadRelations=categories `,
      );
      return data;
    },
  });
};

export default useGetBlog;
