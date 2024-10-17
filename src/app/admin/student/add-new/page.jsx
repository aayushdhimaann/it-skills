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
import { Loader2, MinusCircle, Plus, UploadCloudIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/UI/textarea";

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
      education_details: [
        {
          education: "",
          university: "",
          year: "",
          division: "",
          percentage: "",
        },
      ], // Default education_details entry
      address: "",
      phone: "",
      phone_alt: "",
      email: "",
      course_fee: "",
      course_duration: "",
      certi_date: "",
      photo: "",
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education_details", // Name of the field array
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
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

              {/* education_details Section */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                {fields.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 border p-4 rounded-lg bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6 relative box-border"
                  >
                    <FormField
                      control={control}
                      name={`education_details.${index}.education`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Education Name"
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
                      name={`education_details.${index}.university`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Board/University</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Board/University"
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
                      name={`education_details.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Passing</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="bg-gray-700 text-white placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out"
                                onChange={(e) => field.onChange(e.target.value)} // Capture value
                              >
                                <option value="">Select Year</option>
                                {Array.from({ length: 50 }, (_, i) => {
                                  const year = new Date().getFullYear() - i;
                                  return (
                                    <option key={year} value={year.toString()}>
                                      {year}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="absolute top-0 right-0 mt-3 mr-3 pointer-events-none">
                                {/* Arrow icon */}
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

                    <FormField
                      control={control}
                      name={`education_details.${index}.division`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Division</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="bg-gray-700 text-white placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out"
                                onChange={(e) => field.onChange(e.target.value)} // Capture value
                              >
                                <option value="">Select Division</option>
                                <option value="1">First</option>
                                <option value="2">Second</option>
                                <option value="3">Third</option>
                              </select>
                              <div className="absolute top-0 right-0 mt-3 mr-3 pointer-events-none">
                                {/* Arrow icon */}
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

                    <FormField
                      control={control}
                      name={`education_details.${index}.percentage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentage</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter Percentage"
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
                        className="flex items-center justify-center p-2 m-8 border border-red-600 bg-red-500 hover:bg-red-700 transition duration-200 ease-in-out"
                      >
                        <MinusCircle className="h-5 w-5" />
                        <span className="ml-1">Remove</span>
                      </Button>
                    )}
                  </motion.div>
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

              {/* address column */}
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Address"
                        {...field}
                        className="bg-gray-800 w-full text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* contact number field */}
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Primary Phone Number"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone_alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Alternate Phone Number"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email field */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email Address"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      {/* Wrapper div with flexbox for alignment */}
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          {...field}
                          className="bg-gray-800 text-white placeholder-gray-400 cursor-pointer w-full sm:w-64 md:w-96 max-w-full" // Responsive width
                        />

                        {/* Upload button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          variant="default"
                          className="w-auto py-3 border border-white text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              <UploadCloudIcon />
                            </>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Signature</FormLabel>
                    <FormControl>
                      {/* Wrapper div with flexbox for alignment */}
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          {...field}
                          className="bg-gray-800 text-white placeholder-gray-400 cursor-pointer w-full sm:w-64 md:w-96 max-w-full" // Responsive width
                        />

                        {/* Upload button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          variant="default"
                          className="w-auto py-3 border border-white text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              <UploadCloudIcon />
                            </>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <hr className="border-gray-700 md:col-span-2" />
              <h5 className="text-xl md:col-span-2 font-bold text-center">
                For Office Use Only
              </h5>

              {/* total course fee field */}
              <FormField
                control={control}
                name="course_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Course Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Total Course Fee"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* desposited fee */}
              <FormField
                control={control}
                name="deposited_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Fee (Deposited)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Admission Fee (Deposited)"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* course duration */}
              <FormField
                control={control}
                name="course_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Duration</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="bg-gray-800 text-white placeholder-gray-400"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certificate due date */}
              <FormField
                control={control}
                name="certi_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Due Date</FormLabel>
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
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
