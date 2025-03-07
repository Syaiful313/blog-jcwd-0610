import { CategoryWithBlogs } from "@/types/categoryWithBlog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";

const useGetCategoryWithBlogs = async () => {
  const { data } = await axios.get<CategoryWithBlogs[]>(
    BASE_URL_API + `/data/categories?loadRelations=blogs&relations`,
  );
  return data;
};

export default useGetCategoryWithBlogs;
