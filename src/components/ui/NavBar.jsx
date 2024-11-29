"use client";

import Link from "next/link";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import NavElement from "./NavElement";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
const NavBar = () => {
  return (
    <Menubar className="fixed w-full flex justify-between items-center px-0 sm:px-6 lg:px-10 rounded-none bg-bgtheme2 text-white border-none z-50 h-16">
      <div className="830px:hidden flex h-full w-full  gap-10">
        {/* Logo */}
        <div className="">
          <MenubarMenu>
            <Link href="/">
              <Image
                src="/asset/logo2.png"
                width={70}
                height={70}
                alt="logo"
              ></Image>
            </Link>
          </MenubarMenu>
        </div>

        {/* all the links */}
        <div className="text-lg w-full ">
          {/* Right section for Login and Signup */}
          <div className="flex items-center space-x-4">
            <NavElement />
          </div>
        </div>
      </div>
      <MenubarMenu>
        <div className="830px:absolute flex justify-center items-center right-3">
          <ThemeToggle />
        </div>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavBar;
