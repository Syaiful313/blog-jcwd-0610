"use client";

import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { FC, useEffect } from "react";

interface IncrementViewsProps {
  objectId: string;
  views: number;
}

const IncrementViews: FC<IncrementViewsProps> = ({ objectId, views }) => {
  const incrementViews = async () => {
    try {
      await axios.put(`${BASE_URL_API}/data/blogs/${objectId}`, {
        views: views + 1,});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    incrementViews();
  });
  return <div/>;
};

export default IncrementViews;
