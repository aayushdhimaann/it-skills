import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/UI/Sidebar";
import { Menu } from "lucide-react";

function Dashboard() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-gray-800 text-white"> {/* Dark mode applied */}
        <div className="grid">
          <Sidebar />
        </div>
        <SheetFooter className="bg-gray-800"> {/* Dark mode for footer */}
          <SheetClose asChild>
            <Button type="submit" className="bg-gray-700 text-white hover:bg-gray-600"> {/* Dark mode button */}
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Dashboard;
