import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="container py-10">
      <Link
        href="/users"
        className="inline-flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to users
      </Link>

      <div className="bg-card rounded-lg p-10 border text-center">
        <h2 className="text-3xl font-bold mb-4">User Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The user you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          href="/users"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Browse All Users
        </Link>
      </div>
    </div>
  );
}
