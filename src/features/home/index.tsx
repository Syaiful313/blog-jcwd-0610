import { Suspense } from "react";
import { BlogList } from "./components/BlogList";
import HeroSection from "./components/HeroSection";
import PopularSection from "./components/PopularSection";
import CallSection from "./components/CallSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <Suspense>
        <BlogList />
      </Suspense>
      <PopularSection/>
      <CallSection />
    </main>
  );
};

export default HomePage;
