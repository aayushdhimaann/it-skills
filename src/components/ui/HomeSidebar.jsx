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
    <div className="z-50">
      <Sidebar className="bg-bgtheme2">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <h1 className="text-2xl text-bgtheme1">ITSKILLS</h1>
            </SidebarGroupLabel>
            <SidebarGroupContent className="bg-bgtheme2">
              <SidebarMenu>
                <Menubar>
                  <div className="  h-auto  flex flex-col justify-between text-2xl border-none">
                    <NavElement />
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
