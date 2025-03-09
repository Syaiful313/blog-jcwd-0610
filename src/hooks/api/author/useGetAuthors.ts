"use client";
import { Author } from "@/types/author";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetAuthors = () => {
  return useQuery({
    queryKey: ["penulis"],
    queryFn: async () => {
      const { data } = await axios.get<Author[]>(`${BASE_URL_API}/data/author`);
      return data;
    },
  });
};

export default useGetAuthors;
