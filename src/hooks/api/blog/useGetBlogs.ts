"use client";
import { Blog } from "@/types/blog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL_API}/data/blogs`);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { getBlogs, blogs, isLoading };
};

export default useGetBlogs;
