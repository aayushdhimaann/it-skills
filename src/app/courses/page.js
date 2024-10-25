"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filterCourse, setFilterCourse] = useState(null);
  const [filterCard, setFilterCard] = useState(null);

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get("/api/course/get-all");
      setCourses(response.data.courses);
      const response2 = await axios.get("api/course/category/get-all");
      setCategory(response2.data?.courseCategories);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <section id="courses" className="max-w-5xl mx-auto">
        <h3 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Our Courses
        </h3>

        {/* Comboboxes for Category and Course Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          {/* Category Combobox */}
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="w-[250px] justify-between rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100"
              >
                <span className="text-purple-950">
                  {selectedCategory
                    ? category.find((cat) => cat.title === selectedCategory)
                        ?.title
                    : "Select Category"}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 rounded-lg shadow-lg border border-gray-200">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No Category found.</CommandEmpty>
                  <CommandGroup>
                    {category.map((cat) => (
                      <CommandItem
                        key={cat._id}
                        value={cat.title}
                        onSelect={(currentValue) => {
                          {
                            console.log("filter course ", cat._id);
                            setFilterCourse(cat._id);
                            setSelectedCourse("");
                            setFilterCard(null);
                          }
                          setSelectedCategory(
                            currentValue === selectedCategory
                              ? ""
                              : currentValue
                          );
                          setOpenCategory(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategory === cat.title
                              ? "text-purple-950"
                              : "opacity-0"
                          )}
                        />
                        {cat.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Course Combobox */}
          <Popover open={openCourse} onOpenChange={setOpenCourse}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCourse}
                className="w-[250px] justify-between rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100"
              >
                <span className="text-purple-950">
                  {selectedCourse
                    ? courses.find((course) => course.name === selectedCourse)
                        ?.name
                    : "Select Course"}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 rounded-lg shadow-lg border border-gray-200">
              <Command>
                <CommandInput placeholder="Search course..." />
                <CommandList>
                  <CommandEmpty>No Course found.</CommandEmpty>
                  <CommandGroup>
                    {(filterCourse === null
                      ? courses
                      : courses.filter((ele) => {
                          // console.log(
                          //   "ele:",
                          //   ele,
                          //   "categoryId:",
                          //   ele.categoryId,
                          //   "filterCourse:",
                          //   filterCourse,
                          //   "matches:",
                          //   ele.categoryId?._id == filterCourse
                          // );

                          return ele.categoryId?._id === filterCourse;
                        })
                    ).map((course) => {
                      {
                        // console.log("course ", course);
                      }
                      return (
                        <CommandItem
                          key={course._id}
                          value={course.name}
                          onSelect={(currentValue) => {
                            setFilterCard(course._id);
                            setSelectedCourse(
                              currentValue === selectedCourse
                                ? ""
                                : currentValue
                            );
                            setOpenCourse(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCourse === course.name
                                ? "text-purple-950"
                                : "opacity-0"
                            )}
                          />
                          {course.name}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            (filterCourse === null
              ? courses
              : courses.filter((ele) => {
                  // console.log(
                  //   "ele:",
                  //   ele,
                  //   "categoryId:",
                  //   ele.categoryId,
                  //   "filterCourse:",
                  //   filterCourse,
                  //   "matches:",
                  //   ele.categoryId?._id == filterCourse
                  // );

                  return ele.categoryId?._id === filterCourse;
                })
            )
              .filter((card) => {
                console.log(filterCard);

                if (filterCard === null) return card;
                else {
                  return card._id === filterCard;
                }
              })
              .map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg p-6"
                >
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                    {course.name}
                  </h4>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No courses available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
