"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth, UserButton } from "@insforge/nextjs";
import { DarkModeToggle } from "./common/theme-toggle";

const DashboardHeader = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="w-full z-50 pt-3  pb-7 bg-background">
      <div className="flex h-14 items-center justify-between">
        <div>
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          {isSignedIn && isLoaded && <UserButton mode="simple" />}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
