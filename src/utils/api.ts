import { Author } from "@/types/author";
import { Blog } from "@/types/blog";

export const BASE_URL_API = "https://peachyrule-us.backendless.app/api";

/** Berapa lama hasil fetch server di-cache sebelum Next merevalidasi (ISR). */
const REVALIDATE_SECONDS = 60;

/**
 * Backendless memakai where-clause bergaya SQL, jadi kutip tunggal di dalam
 * literal harus digandakan agar slug tidak bisa keluar dari string dan
 * menyuntik kondisi lain.
 */
const escapeSqlLiteral = (value: string) => value.replace(/'/g, "''");

/**
 * Ambil satu baris dari sebuah tabel Backendless berdasarkan slug.
 *
 * @param table Nama tabel, misal "blogs".
 * @param slug Slug dari URL — tidak dipercaya, selalu di-escape.
 * @param relations Relasi yang ikut dimuat, misal ["author"].
 * @returns Baris pertama yang cocok, atau null kalau tidak ada.
 */
async function findBySlug<T>(
  table: string,
  slug: string,
  relations: string[],
): Promise<T | null> {
  const query = new URLSearchParams({
    where: `\`slug\` = '${escapeSqlLiteral(slug)}'`,
  });
  relations.forEach((relation) => query.append("loadRelations", relation));

  const response = await fetch(`${BASE_URL_API}/data/${table}?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Backendless ${table} membalas ${response.status}`);
  }

  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

export const getBlogBySlug = (slug: string) =>
  findBySlug<Blog>("blogs", slug, ["author", "categories"]);

export const getAuthorBySlug = (slug: string) =>
  findBySlug<Author>("author", slug, ["blogs"]);
