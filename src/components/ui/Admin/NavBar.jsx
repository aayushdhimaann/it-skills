"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/ui/Admin/Sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";

const AdminNavBar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to manage Sheet visibility

  return (
    <nav className="bg-bgtheme2 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" bg-bgtheme2 text-lg font-semibold text-white h-full w-full flex justify-between items-center pr-3">
          <Link href="/">
            <Image
              src="/asset/logo2.png"
              width={70}
              height={70}
              alt="logo"
            ></Image>
          </Link>
          <div className="flex justify-center items-center box-border rounded-2xl hover:bg-slate-500 bg-slate-700 right-3">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer text-white" />
            </SheetTrigger>
            <SheetContent className="bg-bgtheme2 text-white rounded-sm border">
              <div className="grid ">
                <Sidebar onClose={() => setIsSheetOpen(false)} />{" "}
                {/* Pass close function */}
              </div>
              <SheetFooter className="bg-gray-800">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="bg-gray-700 text-white hover:bg-gray-600"
                  >
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
