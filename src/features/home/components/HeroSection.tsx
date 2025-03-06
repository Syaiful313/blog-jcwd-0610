import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="py-10 sm:py-16 md:py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left order-2 md:order-1 mt-8 md:mt-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-tight">
              Make better <br className="hidden sm:block" />
              coffee ☕️
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-500 mt-4">
              why learn how to blog?
            </h2>
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full order-1 md:order-2">
            <Image
              src="/undraw1.svg"
              alt="coffee"
              width={600}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;