import Team from "./_components/Team";

export default function AboutPage() {
  return (
    <div className="container px-4 sm:px-6 py-8 sm:py-10 mx-auto">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-center sm:text-left">HotCoffee Blog</h1>

        <section className="mb-8 sm:mb-12">
          <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Our Story</h2>
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <p className="mb-3">
              Modern Blog was founded in 2020 with a simple mission: to provide
              insightful, well-researched content across a variety of topics
              that matter to our readers. What started as a small personal blog
              has grown into a platform featuring diverse voices and
              perspectives.
            </p>
            <p className="mb-3">
              Our journey began when our founder, John Doe, recognized the need
              for a blog that bridges the gap between in-depth analysis and
              accessible content. With a background in journalism and a passion
              for technology, John set out to create a space where readers could
              find thoughtful articles on topics ranging from the latest tech
              trends to travel adventures and lifestyle tips.
            </p>
            <p>
              Over the years, we've expanded our team to include writers with
              expertise in various fields, allowing us to cover a broader range
              of subjects while maintaining the quality and depth that our
              readers have come to expect.
            </p>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Our Mission & Vision</h2>
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <p className="mb-3">
              <strong>Mission:</strong> To provide valuable, accurate, and
              engaging content that informs, inspires, and empowers our readers
              to make better decisions and explore new ideas.
            </p>
            <p className="mb-3">
              <strong>Vision:</strong> To become a trusted source of information
              and inspiration, fostering a community of curious minds who value
              knowledge, creativity, and thoughtful discourse.
            </p>
            <p>
              We believe in the power of well-crafted content to educate,
              entertain, and inspire. Our articles are meticulously researched
              and written with our readers in mind, striking a balance between
              depth and accessibility. We're committed to maintaining high
              editorial standards and continuously improving our content to
              better serve our audience.
            </p>
          </div>
        </section>

        <Team />

        <section>
          <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Contact Us</h2>
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <p className="mb-3">
              We value your feedback and are always open to suggestions,
              questions, or collaboration opportunities. Feel free to reach out
              to us through any of the following channels:
            </p>
            <ul className="space-y-2 mb-3">
              <li className="flex flex-col sm:flex-row sm:items-center">
                <strong className="mr-2">Email:</strong> 
                <span>contact@modernblog.com</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center">
                <strong className="mr-2">Social Media:</strong> 
                <span>Follow us on Twitter, Facebook, and Instagram @ModernBlog</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center">
                <strong className="mr-2">Address:</strong> 
                <span>123 Content Street, Digital City, 10001</span>
              </li>
            </ul>
            <p>
              For business inquiries, advertising opportunities, or partnership
              proposals, please email business@modernblog.com.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}