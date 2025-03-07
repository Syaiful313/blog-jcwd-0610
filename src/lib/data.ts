import { Author } from "@/types/author";
import { Category } from "@/types/category";

export const authors: Author[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/johndoe.avif",
    bio: "John is a tech enthusiast and has been writing about technology for over 10 years. He loves to explore new gadgets and share his insights with readers.",
    role: "Editor-in-Chief",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/janesmith.avif",
    bio: "Jane is a travel blogger who has visited over 50 countries. She shares her travel experiences, tips, and recommendations with her readers.",
    role: "Travel Writer",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "/michael.avif",
    bio: "Michael is a food enthusiast who loves to explore different cuisines. He shares recipes, restaurant reviews, and cooking tips on the blog.",
    role: "Food Writer",
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "/emily.avif",
    bio: "Emily is a lifestyle blogger who writes about fashion, beauty, and wellness. She shares her personal experiences and tips with her readers.",
    role: "Lifestyle Writer",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    title: "Teknologi",
    description: "Latest news and updates from the tech world",
    slug: "technology",
  },
  {
    id: "2",
    title: "Travel",
    description: "Explore destinations, travel tips, and adventures",
    slug: "travel",
  },
  {
    id: "3",
    title: "Food",
    description: "Recipes, cooking tips, and restaurant reviews",
    slug: "food",
  },
  {
    id: "4",
    title: "Lifestyle",
    description: "Fashion, beauty, wellness, and personal development",
    slug: "lifestyle",
  },
];
