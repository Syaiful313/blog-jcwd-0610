const ContactSection = () => {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">Contact Us</h2>
      <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
        <p className="mb-3">
          We value your feedback and are always open to suggestions, questions,
          or collaboration opportunities. Feel free to reach out to us through
          any of the following channels:
        </p>
        <ul className="mb-3 space-y-2">
          <li className="flex flex-col sm:flex-row sm:items-center">
            <strong className="mr-2">Email:</strong>
            <span>contact@modernblog.com</span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center">
            <strong className="mr-2">Social Media:</strong>
            <span>
              Follow us on Twitter, Facebook, and Instagram @ModernBlog
            </span>
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
  );
};

export default ContactSection;
