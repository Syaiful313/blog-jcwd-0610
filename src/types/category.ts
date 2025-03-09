import { Blog } from "./blog";

export interface Category {
  id: string;
  title: string;
  description: string;
  slug: string;
  blog?: Blog[]
}
