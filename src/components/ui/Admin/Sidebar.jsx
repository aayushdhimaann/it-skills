"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { PlusCircle, BookOpen, Users, User } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"; // Import your drawer components
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ onClose }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(null); // State to manage which drawer is open

  // Function to handle navigation and close all drawers
  const handleNavigation = (url) => {
    setOpenDrawer(null);
    onClose(); // Close all drawers
    router.replace(url); // Change URL
  };

  return (
    <div className="min-w-full p-6 min-h-screen text-white">
      {/* Sidebar Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <p className="text-gray-400 text-sm">
          Manage students and courses and more.
        </p>
      </div>

      {/* Action List */}
      <ul className="space-y-4">
        {/* Students Drawer */}
        <li className="group">
          <Drawer
            open={openDrawer === "students"}
            onOpenChange={() =>
              setOpenDrawer(openDrawer === "students" ? null : "students")
            }
          >
            <DrawerTrigger>
              <Button className="flex items-center justify-start w-full p-3   transition-colors duration-200 ">
                <User className="mr-2" /> {/* Icon for Student */}
                <span>Student</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-900 flex items-center">
              <div className="lg:w-96">
                <DrawerHeader>
                  <DrawerTitle className="text-center text-white">
                    Manage Students
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    Select an action below:
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col items-center justify-center space-y-4 p-4">
                  {/* Card for Add Student */}
                  <Button
                    className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() => handleNavigation("/admin/student/add-new")}
                  >
                    <PlusCircle className="mr-2" /> {/* Icon for Add Student */}
                    <span>Add Student</span>
                  </Button>

                  {/* Card for View All Students */}
                  <Button
                    className="flex items-center justify-start w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() => handleNavigation("/admin/student/view-all")}
                  >
                    <Users className="mr-2" />{" "}
                    {/* Icon for View All Students */}
                    <span>View All Students</span>
                  </Button>
                </div>
                <DrawerFooter className="justify-center">
                  <DrawerClose>
                    <Button
                      variant="outline"
                      onClick={() => setOpenDrawer(null)}
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </li>

        {/* Courses Drawer */}
        <li className="group">
          <Drawer
            open={openDrawer === "courses"}
            onOpenChange={() =>
              setOpenDrawer(openDrawer === "courses" ? null : "courses")
            }
          >
            <DrawerTrigger>
              <Button className="flex items-center justify-start w-full p-3 ">
                <BookOpen className="mr-2" /> {/* Icon for Course */}
                <span>Course</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-900 flex items-center">
              <div className="lg:w-96">
                <DrawerHeader>
                  <DrawerTitle className="text-center text-white">
                    Manage Courses
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    Select an action below:
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col items-center justify-center space-y-4 p-4">
                  {/* Card for Add Course */}
                  <Button
                    className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() => handleNavigation("/admin/course/add-new")}
                  >
                    <PlusCircle className="mr-2" /> {/* Icon for Add Course */}
                    <span>Add Course</span>
                  </Button>

                  {/* Card for View All Courses */}
                  <Button
                    className="flex items-center justify-start w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={() =>
                      handleNavigation("/admin/course/all-courses")
                    }
                  >
                    <Users className="mr-2" /> {/* Icon for View All Courses */}
                    <span>View All Courses</span>
                  </Button>
                </div>
                <DrawerFooter className="justify-center">
                  <DrawerClose>
                    <Button
                      variant="outline"
                      onClick={() => setOpenDrawer(null)}
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </li>

        {/* Manage Enrollments */}
        <li className="group">
          <Button className="flex items-center justify-start w-full p-3 ">
            <Users className="mr-2" /> {/* Icon for Manage Enrollments */}
            <span>Manage Enrollments</span>
          </Button>
        </li>
      </ul>

      {/* Decorative Design Elements */}
      <div className="mt-12 border-t border-gray-700 pt-6">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
            S
          </div>
          <div>
            <p
              className="font-semibold text-sm cursor-pointer"
              onClick={() => {
                handleNavigation("/admin/setting");
              }}
            >
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
