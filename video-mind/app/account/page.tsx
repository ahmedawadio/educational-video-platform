"use client";

import { getNavigationIcon } from "@/lib/icons";
import { PageHeader } from "@/components/header/page-header";
import { UserProfile } from "@/components/section/user-profile";
import { VideoManagement } from "@/components/videos/video-management";

export default function AccountPage() {
  // Get the account icon
  const AccountIcon = getNavigationIcon("account");

  return (
    <div className="container py-10">
      <PageHeader
        title="Your Account"
        description="Manage your profile, preferences, and account settings"
        icon={<AccountIcon />}
        category="account"
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <UserProfile />
        </div>

        <div className="md:col-span-2">
          <div className="bg-card rounded-lg p-6 border h-full">
            {/* <h2 className="text-xl font-semibold mb-4">Video Management</h2> */}
            <VideoManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
