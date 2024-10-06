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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const NavBar = () => {
  const [isSignupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <Menubar className="flex justify-between items-center p-4">
      {/* Left section for Home */}
      <MenubarMenu>
        <Link href={"/"}>Home</Link>
      </MenubarMenu>

      {/* Right section for Login and Signup */}
      <div className="flex space-x-4">
        <MenubarMenu>
          <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-transparent border-none shadow-none text-black hover:bg-transparent hover:border-none hover:shadow-none">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Login />
            </DialogContent>
          </Dialog>
        </MenubarMenu>
        <MenubarMenu>
          <Dialog open={isSignupDialogOpen} onOpenChange={setSignupDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-transparent border-none shadow-none text-black hover:bg-transparent hover:border-none hover:shadow-none">Signup</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>SignUp</DialogTitle>
                <DialogDescription>
                  Signup to get started.
                </DialogDescription>
              </DialogHeader>
              <Signup onClose={() => setSignupDialogOpen(false)} /> {/* Pass onClose function */}
            </DialogContent>
          </Dialog>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};

export default NavBar;
