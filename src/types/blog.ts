import { Author } from "./author";
import { Category } from "./category";

export type Blog = {
  objectId: string; // ID unik dari Backendless
  thumbnail: string; // File Reference (URL gambar)
  category: string; // String dengan max length 250
  content: string; // Text (bisa panjang)
  description: string; // Text (bisa panjang)
  slug: string; // String dengan max length 250
  title: string; // String dengan max length 250
  ownerId: string; // String dengan max length 36
  created: string; // Datetime (ISO string)
  updated: string; // Datetime (ISO string)
  author: Author;
  categories: Category[];
};
