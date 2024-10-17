"use client";
import { Button } from "@/components/UI/button"; // Adjust import according to your actual ShadCN component path
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Link from "next/link";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
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

const NavBar = () => {
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  return (
    <Menubar className="flex justify-between items-center px-0 sm:px-6 lg:px-10 rounded-none bg-gray-800 text-white border-none">
      {/* Left section for Home */}
      <MenubarMenu>
        <Link
          href={"/"}
          className={`${pathname == "/" ? "underline" : "text-white"}`}
        >
          Home
        </Link>
      </MenubarMenu>

      {/* Right section for Login and Signup */}
      <div className="flex items-center space-x-4">
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
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setLoginDialogOpen}
              >
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
                <DialogContent className="sm:max-w-[425px]">
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
                <DialogContent className="sm:max-w-[425px]">
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
        {session.data && (
          <>
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
      </div>
    </Menubar>
  );
};

export default NavBar;
