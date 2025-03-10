import ContactSection from "./components/ContactSection";
import OurStorySection from "./components/OurStorySection";
import Team from "./components/Team";
import VisiMisiSection from "./components/VisiMisiSection";

const AboutPage = () => {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-3xl font-bold sm:mb-6 sm:text-left sm:text-4xl">
          HotCoffee Blog
        </h1>

        <OurStorySection />
        <VisiMisiSection />
        <Team />
        <ContactSection />
      </div>
    </div>
  );
};

export default AboutPage;
