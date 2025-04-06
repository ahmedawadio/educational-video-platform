import { redirect } from "next/navigation";

export default function VideosPage() {
  redirect("/explore");

  // This won't be reached, but required for TypeScript
  return null;
}
