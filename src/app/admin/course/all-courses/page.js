"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import addCourseSchema from "@/app/schemas/addCourseSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react"; // Import Lucide icons
import GlobalTooltip from "@/components/ui/GlobalTooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [singleCourse, setSingleCourse] = useState({});
  const [course, setCourse] = useState([]);
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  const { toast } = useToast();
  const [deleteCourseId, setDeleteCourseId] = useState(null); // State to store the course ID to delete

  const form = useForm({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  // filtering data
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // fetching all course initially
  const fetchAllCourse = async () => {
    try {
      const response = await axios.get("/api/course/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const fetchedCourses = response.data.courses.map((course) => {
          return {
            id: course._id, // Add course ID
            name: course.name,
            description: course.description,
            categoryId: course.categoryId._id,
            categoryName: course.categoryId.title,
          };
        });
        setCourse(fetchedCourses);
      } else {
        toast({
          title: "Error",
          description:
            "Error in Fetching Course! Status Code: " + response.status,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in fetching course:", error.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred: " + error.message,
        variant: "destructive",
      });
    }
  };

  // fetching all course categories initially
  const getCourseCategories = async () => {
    try {
      const response = await axios.get("/api/course/category/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCourseCategories(response.data.courseCategories);
      } else {
        setCourseCategories([]);
      }
    } catch (error) {
      console.error("Error in fetching course categories:", error.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred: " + error.message,
        variant: "destructive",
      });
    }
  };

  // deleting course
  const handleDeleteCourse = async () => {
    try {
      const response = await axios.post(
        "/api/course/delete",
        { id: deleteCourseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Course deleted successfully.",
          variant: "success",
        });
        setDeleteCourseId(null); // Reset the ID
        fetchAllCourse();
      } else {
        toast({
          title: "Error",
          description: "Error deleting course! Status Code: " + response.status,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in deleting course:", error.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred: " + error.message,
        variant: "destructive",
      });
    }
  };

  // editing course
  const editCourse = (courseId) => {
    const editableCourse = course.find((item) => item.id === courseId);
    setSingleCourse(editableCourse);
    setEditDialogOpen(true);
    reset({
      name: editableCourse.name, // Set course name
      category: editableCourse.categoryId, // Set course category
      description: editableCourse.description, // Set course description
    });
  };

  // update course
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Include the course ID in the request payload
      const response = await axios.post(
        "/api/course/update",
        {
          ...data,
          id: singleCourse.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Course updated successfully.",
          variant: "success",
        });
        fetchAllCourse(); // Refresh course list
        setEditDialogOpen(false); // Close the dialog
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Error",
        description: "Failed to update course.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllCourse();
      getCourseCategories();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <div className="container mx-auto p-4 lg:px-10">
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] 500px:w-[80%]  ">
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* course name Field */}
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Course Name"
                          {...field}
                          className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* course category */}
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Category</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            className="bg-gray-800 text-white placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white cursor-pointer"
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            <option value="">Select Category</option>
                            {courseCategories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                          <div className="absolute top-0 right-0 mt-3 mr-3 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 10l5 5 5-5"
                              />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* course description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Description"
                          {...field}
                          className="bg-gray-800 w-full h-48 text-white placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button (Full Width) */}
                <div className="md:col-span-2 flex justify-center">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="default"
                    className="w-auto py-3 border border-white bg-gray-900 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <div className="flex justify-between items-center">
          <Select
            className="bg-gray-800 text-white"
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-auto lg:w-[180px] bg-gray-700 border border-gray-600 text-white">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-600">
              {/* Clear Selection Option */}
              <SelectItem
                value="clear"
                className="text-white hover:bg-gray-700 cursor-pointer"
              >
                Select a Category
              </SelectItem>
              {courseCategories.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                  className="text-white hover:bg-gray-700 flex items-center cursor-pointer"
                >
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href="/admin/course/add-new" className="hover:underline">
            Add New Course
          </Link>
        </div>

        {/* Show items only if a category is selected */}
        {selectedCategory && selectedCategory !== "clear" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {course
              .filter((item) => item.categoryId === selectedCategory)
              .map((item, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 text-white shadow-lg relative"
                >
                  <CardContent className="flex items-start p-4">
                    <div className="flex-1">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2 px-2">
                      <GlobalTooltip content="Edit">
                        <Pencil
                          className="cursor-pointer w-4"
                          onClick={() => {
                            editCourse(item.id);
                          }}
                        />
                      </GlobalTooltip>
                      <GlobalTooltip content="Delete">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Trash
                              className="cursor-pointer w-4"
                              onClick={() => setDeleteCourseId(item.id)} // Set the ID for deletion
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete</AlertDialogTitle>
                              <AlertDialogDescription>
                                Do you really want to delete this course?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setDeleteCourseId(null)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleDeleteCourse();
                                  setDeleteCourseId(null); // Reset the ID after delete
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </GlobalTooltip>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
