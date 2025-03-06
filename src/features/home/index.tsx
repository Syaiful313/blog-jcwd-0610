import { Suspense } from "react";
import { BlogList } from "./components/BlogList";
import HeroSection from "./components/HeroSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <Suspense>
        <BlogList />
      </Suspense>
    </main>
  );
};

export default HomePage;
