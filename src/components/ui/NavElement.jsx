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
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <div className=" w-full 830mpx:flex 830px:mb-10">
        <MenubarMenu>
          <Link
            href={"/"}
            className={
              `${pathname == "/" ? "border-b-4 text-bgtheme1" : "text-white"}` +
              " flex items-center  px-6 py-3  hover:text-bgtheme1 hover:border-bgtheme1 transition-all   830px:pt-12  830px:border-bgtheme2 border-bgtheme1 "
            }
          >
            Home
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link
            href={"/courses"}
            className={
              `${
                pathname == "/courses"
                  ? "border-b-4 text-bgtheme1"
                  : "text-white"
              }` +
              " flex items-center  px-6 py-3  hover:text-bgtheme1 hover:border-bgtheme1 transition-all border-bgtheme1 830px:border-bgtheme2"
            }
          >
            Courses
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link
            href={"/contact"}
            className={
              `${
                pathname == "/contact"
                  ? "border-b-4 text-bgtheme1"
                  : "text-white"
              }` +
              " flex items-center  px-6 py-3  hover:text-bgtheme1 hover:border-bgtheme1 transition-all border-bgtheme1 830px:border-bgtheme2 "
            }
          >
            Contact
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link
            href={"/about"}
            className={
              `${
                pathname == "/about" ? "border-b-4 text-bgtheme1" : "text-white"
              }` +
              " flex items-center  px-6 py-3  hover:text-bgtheme1 hover:border-bgtheme1 transition-all border-bgtheme1 830px:border-bgtheme2 "
            }
          >
            About
          </Link>
        </MenubarMenu>
      </div>
      <div className="w-5/6 flex 830mpx:justify-end  gap-4  830px:border-t-4  830px:border-bgtheme1  830px:flex-col 830px:items-start 830px:mt-3 830px:self-center 830px:pt-6">
        {pathname == "/sign-in" ||
        pathname == "/sign-up" ||
        session.data !== null ? (
          ""
        ) : (
          <>
            <MenubarMenu>
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setLoginDialogOpen}
              >
                {pathname == "/sign-up" ? (
                  <Button
                    className="bg-transparent border-none shadow-none text-black hover:bg-gray-10 transition-all "
                    onClick={() => {
                      router.replace("/sign-in");
                    }}
                  >
                    Login
                  </Button>
                ) : (
                  <DialogTrigger asChild>
                    <Button className="shadow-none 830px:bg-transparent text-xl text-bgtheme1 830mpx:border-2 border-bgtheme1 transition-all rounded-3xl 830px:text-2xl  hover:bg-bgtheme1 hover:text-bgtheme2">
                      Login
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent className="sm:max-w-[425px] 500px:w-[80%]  ">
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
                  <Button className="shadow-none  text-xl text-bgtheme1 830px:bg-transparent 830mpx:border-2 border-bgtheme1 transition-all rounded-3xl 830px:text-2xl  hover:bg-bgtheme1 hover:text-bgtheme2">
                    Signup
                  </Button>
                </DialogTrigger>
                <DialogContent className="my-5 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>SignUp</DialogTitle>
                    <DialogDescription>
                      Signup to get started.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Pass onClose function */}
                  <Signup onClose={() => setSignupDialogOpen(false)} />{" "}
                </DialogContent>
              </Dialog>
            </MenubarMenu>
          </>
        )}
        <div className=" text-xl flex gap-1 830mpx:items-center px-3 830px:flex-col 830px:w-full 830px:text-2xl 830px:h-48 830px:justify-between 830px:items-center">
          {(session.data?.user?._role === "6706bc9fff27bd499083aac2" ||
            session.data?.user?._role === "6706bd8dff27bd499083aac3") && (
            <MenubarMenu>
              <Link
                href={"/admin/dashboard"}
                className={
                  `${
                    pathname == "/admin/dashboard"
                      ? "border-b-4 text-bgtheme1"
                      : "text-white"
                  }` +
                  " flex items-center  px-6 py-3  hover:text-bgtheme1 hover:border-bgtheme1 transition-all border-bgtheme1 830px:border-bgtheme2 "
                }
              >
                Admin
              </Link>
            </MenubarMenu>
          )}
          {session.data && (
            <>
              {/* {console.log(session.data.user)} */}
              <MenubarMenu>
                <div className="text-bgtheme1 830mpx:border-l-2 border-bgtheme1 px-3 830px:hidden">
                  Hi, {session.data.user._username}
                </div>
              </MenubarMenu>
              <MenubarMenu>
                <Button
                  className=" shadow-none  text-xl text-bgtheme1 border-2 border-bgtheme1 transition-all rounded-3xl 830px:text-2xl  hover:bg-bgtheme1 hover:text-bgtheme2"
                  onClick={() => {
                    signOut({ callbackUrl: "/sign-in" });
                  }}
                >
                  Logout
                </Button>
              </MenubarMenu>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavElement;
