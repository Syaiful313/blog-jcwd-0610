"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Menangkap error render dan fetch yang gagal di seluruh aplikasi, misalnya
 * saat Backendless tidak membalas 2xx.
 *
 * Pesan error aslinya sengaja hanya masuk console, tidak ditampilkan ke
 * pengunjung — isinya bisa membocorkan URL internal dan detail infrastruktur.
 */
const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-4 md:mx-0">
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t load this page. This is usually temporary — please
            try again.
          </p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundary;
