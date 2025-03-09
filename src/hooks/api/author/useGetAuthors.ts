"use client";
import { Author } from "@/types/author";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthors = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL_API}/data/author`);
      setAuthors(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return { getAuthors, authors, isLoading };
};

export default useGetAuthors;
