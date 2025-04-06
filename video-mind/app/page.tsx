import { redirect } from "next/navigation";

export default function Home() {
  redirect("/explore");

  // This won't be reached, but required for TypeScript
  return null;
}
