"use client";
import HomeSidebar from "@/components/ui/HomeSidebar";
import NavBar from "@/components/ui/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function MainBar() {
  return (
    <div>
      <NavBar />
      <div className="830px:block hidden fixed top-0 z-50 h-0 ">
        <SidebarProvider>
          <div className="flex justify-around h-6 w-40 mt-2 z-50">
            <SidebarTrigger className="text-bgtheme1  hover:bg-bgtheme2 hover:text-white p-2 mt-2  text-4xl rounded" />
            {/* <ModeToggle /> */}

            <div className="bg-red-500">
              <Link href="/">
                <Image
                  src="/asset/logo2.png"
                  width={70}
                  height={70}
                  alt="logo"
                ></Image>
              </Link>
            </div>
          </div>
          <HomeSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}

export default MainBar;
