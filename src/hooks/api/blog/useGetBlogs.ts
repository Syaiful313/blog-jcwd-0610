"use client";
import { Blog } from "@/types/blog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetBlogs = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axios.get<Blog[]>(
        `${BASE_URL_API}/data/blogs?sortBy=%60views%60%20desc`,
      );
      return data;
    },
  });

  return { getBlogs: refetch, blogs: data ?? [], isLoading: isPending };
};

export default useGetBlogs;
