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
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import addCourseSchema from "@/app/schemas/addCourseSchema";
import { useSession } from "next-auth/react";

const AddNewCourse = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courseDuration, setCourseDuration] = useState([]);
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  // Form initialization with Zod validation
  const form = useForm({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      name: "",
      category: "",
      duration: "",
      description: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/course/add-new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 201) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // fetching course categories
  const getCourseCategories = async () => {
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
  };

  // fetching all the course durations from the table
  const getCourseDuration = async () => {
    const response = await axios.get("/api/course/duration/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      // console.log(response.data.courseDuration);

      setCourseDuration(response.data.courseDuration);
    } else {
      setCourseDuration([]);
    }
  };
  useEffect(() => {
    if (status == "authenticated") {
      getCourseCategories();
      getCourseDuration();
    }
  }, [status]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-4xl sm:p-5 p-4">
        <h1 className="text-3xl font-bold mb-8 text-center xxs:mt-10">
          Add New Course
        </h1>
        <motion.div
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
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
                        className=" text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
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
                          className=" text-white bg-transparent placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white cursor-pointer"
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
              {/* Course Duration */}
              <FormField
                control={control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Course Duration</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          className=" text-white bg-transparent placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white cursor-pointer"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">Select Duration</option>
                          {courseDuration.map((duration) => {
                            return (
                              <option key={duration._id} value={duration.title}>
                                {duration.title}
                              </option>
                            );
                          })}
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
                        className=" w-full text-white placeholder-gray-400"
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
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNewCourse;
