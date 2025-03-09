"use client";
import { Category } from "@/types/category";
import { BASE_URL_API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCategories = () => {
  return useQuery({
    queryKey: ["penulis"],
    queryFn: async () => {
      const { data } = await axios.get<Category[]>(
        `${BASE_URL_API}/data/categories`,
      );
      return data;
    },
  });
};

export default useGetCategories;
