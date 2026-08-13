import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | number) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Ubah tanggal Backendless (epoch milidetik) jadi ISO 8601, format yang
 * dituntut atribut `datetime` HTML dan meta tag Open Graph.
 *
 * @returns String ISO, atau undefined kalau tanggalnya tidak valid — supaya
 * meta tag-nya hilang sama sekali ketimbang berisi nilai sampah.
 */
export function toIsoDate(date: string | number): string | undefined {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export function formatContent(content: string) {
  return content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
