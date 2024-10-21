import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import Link from "next/link";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import NavElement from "./NavElement";
import { Menubar, MenubarMenu } from "@radix-ui/react-menubar";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function HomeSidebar() {
  const pathname = usePathname();
  return (
    <div>
      <Sidebar variant="floating" className="dark">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent className="dark">
              <SidebarMenu>
                <Menubar>
                  <div
                    className={`fixed top-10 left-0 h-full w-64  text-white transform transition-transform duration-300 ease-in-out shadow-lg z-10 `}
                    style={{ margin: "0px" }}
                  >
                    <div className=" flex h-full w-64 flex-col justify-top gap-10  items-center pt-7 backdrop-blur-xl">
                      <MenubarMenu>
                        <Link
                          href={"/"}
                          className={
                            `${pathname == "/" ? "underline" : "text-white"}` +
                            " flex items-center"
                          }
                        >
                          Home
                        </Link>
                      </MenubarMenu>

                      <NavElement />
                    </div>
                  </div>
                </Menubar>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default HomeSidebar;
