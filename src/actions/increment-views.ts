"use server";

import { BASE_URL_API } from "@/utils/api";

/**
 * objectId Backendless berupa UUID. Divalidasi supaya action ini tidak bisa
 * dipakai menembak path lain lewat karakter seperti "/" atau "..".
 */
const OBJECT_ID_PATTERN = /^[a-zA-Z0-9-]{1,64}$/;

/**
 * Menaikkan penghitung views sebuah blog satu langkah, dijalankan di server.
 *
 * Browser tidak lagi memegang endpoint tulis Backendless; ia hanya bisa
 * meminta operasi terbatas ini. Perlu dicatat: ini mempersempit apa yang bisa
 * dilakukan lewat aplikasi kita, TAPI tidak menutup tabelnya. Selama peran
 * NotAuthenticatedUser di konsol Backendless masih punya izin Update, siapa
 * pun tetap bisa menulis kolom apa pun langsung ke REST API-nya.
 *
 * ponytail: masih read-modify-write, jadi dua pengunjung bersamaan bisa
 * saling menimpa. Ganti dengan operasi atomik kalau angka views mulai dipakai
 * untuk sesuatu yang serius.
 */
export async function incrementBlogViews(objectId: string): Promise<void> {
  if (!OBJECT_ID_PATTERN.test(objectId)) {
    throw new Error("objectId tidak valid");
  }

  const url = `${BASE_URL_API}/data/blogs/${objectId}`;

  const currentResponse = await fetch(`${url}?property=views`, {
    cache: "no-store",
  });
  if (!currentResponse.ok) {
    throw new Error(`Gagal membaca views: ${currentResponse.status}`);
  }
  const { views } = (await currentResponse.json()) as { views: number | null };

  const updateResponse = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ views: (views ?? 0) + 1 }),
  });
  if (!updateResponse.ok) {
    throw new Error(`Gagal menulis views: ${updateResponse.status}`);
  }
}
