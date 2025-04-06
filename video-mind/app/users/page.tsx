import { Metadata } from "next";
import { CategoryIcon } from "@/components/ui/category-icon";
import { getNavigationIcon } from "@/lib/icons";
import { UserList } from "@/components/section/user-list";
import { PageHeader } from "@/components/header/page-header";

export const metadata: Metadata = {
  title: "Users",
  description: "Browse through community users",
};

export default function UsersPage() {
  // Get the users icon
  const UsersIcon = getNavigationIcon("users");

  return (
    <div className="container py-10">
      <PageHeader
        title="Community Users"
        description="Connect with other learners and instructors on the platform"
        icon={<UsersIcon />}
        category="users"
      />

      <div className="mt-10">
        <UserList />
      </div>
    </div>
  );
}
