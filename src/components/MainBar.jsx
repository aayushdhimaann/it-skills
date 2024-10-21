"use client";
import HomeSidebar from "@/components/ui/HomeSidebar";
import NavBar from "@/components/ui/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function MainBar() {
  return (
    <div>
      <NavBar />
      <div className="500px:block hidden z-100 absolute">
        <SidebarProvider>
          <div className="flex justify-around h-6 w-40 mt-4">
            <SidebarTrigger className="text-white text-lg hover:bg-gray-700 hover:text-white p-2 rounded" />
            {/* <ModeToggle /> */}
            <h1 className="text-white text-lg hover:bg-gray-700 hover:text-white px-1 rounded">
              ITSKILLS
            </h1>
          </div>
          <HomeSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}

export default MainBar;
