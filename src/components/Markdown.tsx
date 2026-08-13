import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";

interface MarkdownProps {
  content: string;
}

/**
 * Merender konten markdown dari API.
 *
 * Sengaja tanpa `rehype-raw`: plugin itu membuat HTML mentah di dalam konten
 * ikut dieksekusi, yang berarti stored XSS begitu ada orang lain yang bisa
 * mengisi konten. Bawaan react-markdown meng-escape HTML jadi teks biasa dan
 * menyaring URL berbahaya seperti `javascript:`. Tidak ada satu pun artikel
 * yang memakai HTML mentah, jadi plugin itu tidak menghasilkan apa pun.
 */
const Markdown: FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h2: ({ children }) => (
      <h2 className="mb-4 text-2xl font-bold">{children}</h2>
    ),
    p: ({ children }) => <p className="mb-4">{children}</p>,
  };
  return <ReactMarkdown components={renderers}>{content}</ReactMarkdown>;
};

export default Markdown;
