import { Blog } from "./blog";

export type Author = {
  objectId: string;
  slug: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  blogs: Blog[];
};
