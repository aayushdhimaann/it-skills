"use client";

import Link from "next/link";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { usePathname } from "next/navigation";
import NavElement from "./NavElement";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <Menubar className="fixed w-full flex justify-between items-center px-0 sm:px-6 lg:px-10 rounded-none bg-gray-800 text-white border-none z-50">
      <div className="500px:hidden flex-grow flex justify-around ">
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

        {/* Right section for Login and Signup */}
        <div className="flex items-center space-x-4">
          <NavElement />
        </div>
      </div>
      <MenubarMenu>
        <div className=" 500px:absolute flex justify-center items-center box-border rounded-2xl hover:bg-slate-500 bg-slate-700 ">
          <ThemeToggle />
        </div>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavBar;
