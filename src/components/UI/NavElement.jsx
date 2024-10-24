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
import React from "react";

function NavElement() {
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <MenubarMenu>
        <Link
          href={"/courses"}
          className={`${pathname == "/courses" ? "underline" : "text-white"}`}
        >
          Courses
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link
          href={"/contact"}
          className={`${pathname == "/contact" ? "underline" : "text-white"}`}
        >
          Contact
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link
          href={"/about"}
          className={`${pathname == "/about" ? "underline" : "text-white"}`}
        >
          About Us
        </Link>
      </MenubarMenu>
      {pathname == "/sign-in" ||
      pathname == "/sign-up" ||
      session.data !== null ? (
        ""
      ) : (
        <>
          <MenubarMenu>
            <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
              {pathname == "/sign-up" ? (
                <Button
                  className="bg-transparent border-none shadow-none text-black hover:bg-gray-100 hover:shadow-lg"
                  onClick={() => {
                    router.replace("/sign-in");
                  }}
                >
                  Login
                </Button>
              ) : (
                <DialogTrigger asChild>
                  <Button className="bg-transparent border-none shadow-none text-white hover:bg-black hover:shadow-lg">
                    Login
                  </Button>
                </DialogTrigger>
              )}
              <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[425px] 500px:w-[80%]  ">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Login onClose={() => setLoginDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </MenubarMenu>
          <MenubarMenu>
            <Dialog
              open={isSignupDialogOpen}
              onOpenChange={setSignupDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-transparent border-none shadow-none text-white hover:bg-black hover:shadow-lg">
                  Signup
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>SignUp</DialogTitle>
                  <DialogDescription>Signup to get started.</DialogDescription>
                </DialogHeader>
                {/* Pass onClose function */}
                <Signup onClose={() => setSignupDialogOpen(false)} />{" "}
              </DialogContent>
            </Dialog>
          </MenubarMenu>
        </>
      )}
      {session.data && (
        <>
          <MenubarMenu>
            <Link
              href={"/admin/dashboard"}
              className={`${
                pathname == "/admin/dashboard" ? "underline" : "text-white"
              }`}
            >
              Admin
            </Link>
          </MenubarMenu>
          <MenubarMenu>
            <Button
              className="bg-transparent border-none shadow-none text-white hover:bg-gray-100 hover:shadow-lg hover:text-black p-2"
              onClick={() => {
                signOut({ callbackUrl: "/sign-in" });
              }}
            >
              Logout
            </Button>
          </MenubarMenu>
          <MenubarMenu>| Hi, {session.data.user._username}</MenubarMenu>
        </>
      )}
    </>
  );
}

export default NavElement;
