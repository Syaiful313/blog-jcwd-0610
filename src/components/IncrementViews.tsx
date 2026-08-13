"use client";

import { incrementBlogViews } from "@/actions/increment-views";
import { FC, useEffect } from "react";

interface IncrementViewsProps {
  objectId: string;
}

/**
 * Menaikkan penghitung views sebuah blog satu kali per kunjungan.
 *
 * Pekerjaan sebenarnya ada di server action; komponen ini hanya pemicunya,
 * supaya endpoint tulis Backendless tidak pernah ikut ke bundel browser.
 */
const IncrementViews: FC<IncrementViewsProps> = ({ objectId }) => {
  useEffect(() => {
    incrementBlogViews(objectId).catch((error) => {
      console.error("Gagal menaikkan views:", error);
    });
  }, [objectId]);

  return null;
};

export default IncrementViews;
