"use client";

import { Blog } from "@/types/blog";
import { BASE_URL_API } from "@/utils/api";
import axios from "axios";
import { FC, useEffect } from "react";

interface IncrementViewsProps {
  objectId: string;
}

/**
 * Menaikkan penghitung views sebuah blog satu kali per kunjungan.
 *
 * Nilai `views` sengaja dibaca ulang di sini, bukan diterima sebagai prop,
 * karena halaman induknya di-cache ISR — prop-nya akan basi selama jendela
 * revalidasi dan setiap pengunjung menulis angka yang sama.
 *
 * ponytail: masih read-modify-write, jadi dua pengunjung bersamaan bisa
 * saling menimpa. Pindahkan ke Route Handler dengan operasi atomik kalau
 * angka views mulai dipakai untuk sesuatu yang serius.
 */
const IncrementViews: FC<IncrementViewsProps> = ({ objectId }) => {
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const { data } = await axios.get<Pick<Blog, "views">>(
          `${BASE_URL_API}/data/blogs/${objectId}?property=views`,
        );
        await axios.put(`${BASE_URL_API}/data/blogs/${objectId}`, {
          views: (data.views ?? 0) + 1,
        });
      } catch (error) {
        console.error("Gagal menaikkan views:", error);
      }
    };

    incrementViews();
  }, [objectId]);

  return null;
};

export default IncrementViews;
