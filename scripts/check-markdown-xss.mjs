/**
 * Memastikan komponen Markdown tidak pernah mengeksekusi HTML mentah dari
 * konten artikel. Jalankan dengan: node scripts/check-markdown-xss.mjs
 *
 * Gagalnya skrip ini berarti ada yang memasang kembali `rehype-raw` (atau
 * plugin sejenis) dan membuka lubang stored XSS.
 *
 * Catatan soal cara mengujinya: output yang aman tetap MENGANDUNG kata
 * "onerror" dan "javascript:" sebagai teks ter-escape, jadi mencari
 * substring polos akan salah alarm. Yang diuji di sini adalah apakah string
 * itu menjadi tag/atribut sungguhan.
 */
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";

const PAYLOADS = [
  '<img src=x onerror="alert(1)">',
  "<script>alert(2)</script>",
  '<a href="javascript:alert(3)">klik</a>',
  "[klik](javascript:alert(4))",
  '<iframe src="https://evil.example"></iframe>',
];

const html = renderToStaticMarkup(
  React.createElement(ReactMarkdown, null, PAYLOADS.join("\n\n")),
);

const realTag = (name) => new RegExp(`<${name}\\b`, "i");

for (const tag of ["script", "iframe", "img"]) {
  assert(!realTag(tag).test(html), `tag <${tag}> jadi elemen sungguhan`);
}
assert(
  !/<[^>]*\son[a-z]+\s*=/i.test(html),
  "event handler jadi atribut sungguhan",
);
assert(
  !/<[^>]*javascript:/i.test(html),
  "URL javascript: masuk ke atribut sungguhan",
);

// Bukti positif: payload benar-benar berubah jadi teks, bukan sekadar hilang.
assert(
  html.includes("&lt;script&gt;"),
  "payload <script> tidak muncul sebagai teks ter-escape",
);

console.log("OK - semua payload ter-escape jadi teks, bukan dieksekusi\n");
console.log(html);
