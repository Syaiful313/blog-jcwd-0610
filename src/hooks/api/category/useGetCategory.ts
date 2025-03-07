import { Category } from "@/types/category";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";

const useGetCategories = async () => {
  const { data } = await axios.get<Category[]>(BASE_URL_API + `/data/category`);

  return data;
};

export default useGetCategories;
