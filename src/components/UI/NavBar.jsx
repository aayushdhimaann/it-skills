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

const NavBar = () => {
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  return (
    <Menubar className="fixed w-full flex justify-between items-center px-0 sm:px-6 lg:px-10 rounded-none bg-gray-800 text-white border-none ">
      {!isSidebarOpen ? (
        <FiMenu
          className="text-2xl cursor-pointer 500px:block hidden "
          onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar on click
        />
      ) : (
        <FiArrowLeft
          className="text-2xl cursor-pointer  500px:block hidden "
          onClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle sidebar on click
        />
      )}

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
      {isSidebarOpen && (
        <div className="500px:block hidden">
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
        </div>
      )}
    </Menubar>
  );
};

export default NavBar;
