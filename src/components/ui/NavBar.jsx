"use client";
import { Button } from "@/components/ui/button"; // Adjust import according to your actual ShadCN component path
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Link from "next/link";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { FiMenu, FiArrowLeft } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import NavElement from "./NavElement";
import HomeSidebar from "./HomeSidebar";
import { SidebarProvider, SidebarTrigger } from "./sidebar";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
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
        <div className=" 500px:absolute  right-2  pr-3  flex justify-center items-center box-border rounded-2xl hover:bg-slate-500 bg-slate-700 ">
          <ThemeToggle /> Theme
        </div>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavBar;
