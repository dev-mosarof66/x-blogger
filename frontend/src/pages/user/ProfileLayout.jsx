import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/custom/UserSidebar";
import UserBottomBar from "../../components/custom/UserBottomBar";
import UserHeader from "../../components/custom/UserHeader";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1 w-full">
        {/* Sidebar (hidden on mobile) */}
        <UserSidebar />

        {/* Main Section */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto py-4">
          <UserHeader />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <UserBottomBar />
    </div>
  );
};

export default ProfileLayout;
