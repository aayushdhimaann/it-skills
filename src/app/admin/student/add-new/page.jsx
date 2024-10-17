"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Loader2, MinusCircle, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Form initialization
  const form = useForm({
    defaultValues: {
      branch: "",
      date_of_admission: "",
      course_name: "",
      course_duration: "",
      student_name: "",
      father_name: "",
      father_occupation: "",
      date_of_birth: "",
      education: [{ institution: "", degree: "", year: "" }], // Default education entry
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education", // Name of the field array
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    reset();
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async action
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="w-full max-w-4xl sm:p-5 p-4">
        <h1 className="text-3xl font-bold mb-8 text-center xxs:mt-10">
          Add New Student
        </h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Branch Field */}
            <FormField
              control={control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Branch"
                      {...field}
                      className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Admission Field */}
            <FormField
              control={control}
              name="date_of_admission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Admission</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-800 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white", // Added hover styles
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 text-white">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          } // Convert to Date object
                          onSelect={(selectedDate) => {
                            field.onChange(selectedDate); // Set value directly in the form state
                          }}
                          initialFocus
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course Name Field */}
            <FormField
              control={control}
              name="course_name"
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

            {/* Course Duration Field */}
            <FormField
              control={control}
              name="course_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Duration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Course Duration"
                      {...field}
                      className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Student Name Field */}
            <FormField
              control={control}
              name="student_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Student Name"
                      {...field}
                      className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Father Name Field */}
            <FormField
              control={control}
              name="father_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Father's Name"
                      {...field}
                      className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Father Occupation Field */}
            <FormField
              control={control}
              name="father_occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Occupation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Father's Occupation"
                      {...field}
                      className="bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white" // Added hover styles
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth Field */}
            <FormField
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-800 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white", // Added hover styles
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 text-white">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          } // Convert to Date object
                          onSelect={(selectedDate) => {
                            field.onChange(selectedDate); // Set value directly in the form state
                          }}
                          initialFocus
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Education Section */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-4 border p-4 rounded-lg bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Institution Name"
                            {...field}
                            className="bg-gray-700 text-white placeholder-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Degree"
                            {...field}
                            className="bg-gray-700 text-white placeholder-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`education.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Graduation</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Year"
                            {...field}
                            className="bg-gray-700 text-white placeholder-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length !== 1 && index !== 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="mt-4"
                    >
                      <MinusCircle />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ institution: "", degree: "", year: "" })
                }
                className="w-auto py-3 border bg-gray-900 border-white text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
              >
                <Plus className="w-4" /> Education
              </Button>
            </div>

            {/* Submit Button (Full Width) */}
            <div className="md:col-span-2 flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                variant="default"
                className="w-auto py-3 border border-white text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
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
      </div>
    </div>
  );
};

export default Page;
