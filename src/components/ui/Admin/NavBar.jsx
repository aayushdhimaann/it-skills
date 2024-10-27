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

const AdminNavBar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to manage Sheet visibility

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold text-white">
          <Link href="/">ITSKILLS LOGO</Link>
        </div>
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer text-white" />
            </SheetTrigger>
            <SheetContent className="bg-gray-900 text-white rounded-sm border">
              <div className="grid">
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
