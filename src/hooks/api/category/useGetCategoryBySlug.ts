import { CategoryWithBlogs } from "@/types/categoryWithBlog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";

const useGetCategoryBySlug = async (slug: string) => {
  const { data } = await axios.get<CategoryWithBlogs[]>(
    BASE_URL_API +
      `/data/categories?where=%60slug%60%20%3D%20'${slug}'&loadRelations=blogs%2Cblogs.author`,
  );

  return data[0];
};

export default useGetCategoryBySlug;
