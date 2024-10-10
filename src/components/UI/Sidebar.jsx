import React from "react";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
  return (
    <div className="min-w-full p-4 min-h-screen">
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="text-black">Add Student</Button>
        <Button variant="outline" className="text-black">Add Course</Button>
      </div>
    </div>
  );
};

export default Sidebar;
