import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="mx-4 md:mx-0">
      <div className="container mx-auto py-10">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
          <p>We couldn&apos;t find the page you&apos;re looking for.</p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
