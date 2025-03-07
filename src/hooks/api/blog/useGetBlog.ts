import { Blog } from "@/types/blog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { cache } from "react";

export const useGetBlog = cache(async (slug: string) => {
  const response = await axios.get(
    `${BASE_URL_API}/data/blogs?where=%60slug%60%20%3D%20'${slug}'&loadRelations=author`,
  );
  const blogs: Blog[] = await response.data;
  return blogs;
});
