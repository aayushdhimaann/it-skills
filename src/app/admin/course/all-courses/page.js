"use client";
import React, { useEffect, useState } from "react";
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

const categoryIcons = {
  "Category A": "🔍",
  "Category B": "📚",
  "Category C": "⚙️",
  "Category D": "🎨",
};

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courseCategories, setCourseCategories] = useState([]);
  const [course, setCourse] = useState([]);
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  const { toast } = useToast();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllCourse();
      getCourseCategories();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <div className="container mx-auto p-4">
        <Select
          className="bg-gray-800 text-white"
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px] bg-gray-700 border border-gray-600 text-white">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border border-gray-600">
            {/* Clear Selection Option */}
            <SelectItem value="clear" className="text-white hover:bg-gray-700">
              Select a Category
            </SelectItem>
            {courseCategories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="text-white hover:bg-gray-700 flex items-center"
              >
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Show items only if a category is selected */}
        {selectedCategory && selectedCategory !== "clear" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {course
              .filter((item) => item.categoryId === selectedCategory)
              .map((item, index) => (
                <Card key={index} className="bg-gray-800 text-white shadow-lg">
                  <CardContent className="flex items-start p-4">
                    <span className="text-2xl mr-4">
                      {categoryIcons[item.categoryName] || "📦"}{" "}
                      {/* Default icon if not found */}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
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
