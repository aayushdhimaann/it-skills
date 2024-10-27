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
import {
  Image,
  Loader2,
  MinusCircle,
  Plus,
  UploadCloudIcon,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import GlobalTooltip from "@/components/ui/GlobalTooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import addStudentSchema from "@/app/schemas/addStudentSchema";
import MotionButton from "@/components/motion/MotionButton";
import { useSession } from "next-auth/react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

const AddNewStudent = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const { toast } = useToast();
  const [photo, setPhoto] = useState("");

  const { data: session } = useSession();
  const token = session?.user._accessToken;

  // Form initialization
  const form = useForm({
    // resolver: zodResolver(addStudentSchema),
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
      deposited_fee: "",
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education_details", // Name of the field array
  });

  // Handle form submission
  const onSubmit = async (data) => {
    if (photo == "") {
      toast({
        title: "Error",
        description: "Please Upload Image",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    // reset();
    try {
      const response = await axios.post(
        "/api/student/add-new",
        { ...data, photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        setPhoto("");
        setPreviewUrl(null);
        reset();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please Select Image!",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    if (imageFile.size > maxSizeInBytes) {
      toast({
        title: "Error",
        description: "File size exceeds 2MB. Please upload a smaller image.",
        variant: "destructive",
      });
      return;
    }
    setImageLoader(true);
    const formData = new FormData();
    formData.append("photo", imageFile);
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add additional headers if needed, like Authorization
        },
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Your image uploaded successfully",
          variant: "success",
        });
        setPhoto(response.data.fileUrl);
      } else {
        toast({
          title: "Error",
          description: "Some error occured",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Photo Upload failed " + error.message,
        variant: "destructive",
      });
    } finally {
      setImageLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-4xl sm:p-5 p-4">
        <h1 className="text-3xl font-bold mb-8 text-center xxs:mt-10">
          Add New Student
        </h1>
        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Image Preview:</DialogTitle>
              <DialogDescription>
                This is showing you the preview of selected image.
              </DialogDescription>
            </DialogHeader>
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  className="w-auto h-auto object-cover rounded-lg mt-2"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
        <motion.div
          initial={{ opacity: 0, y: -300, x: -1000 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:"
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
                              "w-full justify-start text-left font-normal   transition-colors duration-200 ease-in-out hover:hover:", // Added hover styles
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
                        <PopoverContent className="w-auto p-0  ">
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
              {/* for future use */}
              {/* <FormField
                control={control}
                name="course_name"
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {courseName
                          ? frameworks.find(
                              (framework) => framework.value === courseName
                            )?.label
                          : "Select course name"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Select course name" />
                        <CommandList>
                          <CommandEmpty>No Course found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue);
                                  setCourseName(
                                    currentValue === courseName
                                      ? ""
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    courseName === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              /> */}
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:"
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:"
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:"
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:"
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
                        className="  placeholder-gray-400 transition-colors duration-200 ease-in-out hover:hover:" // Added hover styles
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
                              "w-full justify-start text-left font-normal   transition-colors duration-200 ease-in-out hover:hover:", // Added hover styles
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
                        <PopoverContent className="w-auto p-0  ">
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
                    className="mb-4 border p-4 rounded-lg  grid grid-cols-1 md:grid-cols-2 gap-6 relative box-border"
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
                              className=" placeholder-gray-400"
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
                              className=" placeholder-gray-400"
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
                                className="border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out"
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
                                className=" placeholder-gray-400 border rounded-md w-full py-2 px-3 appearance-none focus:outline-none focus:border-white focus:ring focus:ring-white transition duration-200 ease-in-out"
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
                              className=" placeholder-gray-400"
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
                  className="w-auto py-3 border  border-white  transition-colors duration-200 ease-in-out hover:hover:"
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
                        className=" w-full  placeholder-gray-400"
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
                        className="  placeholder-gray-400"
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
                        className="  placeholder-gray-400"
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
                        className="  placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* profile photo */}
              <FormField
                control={control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      {/* Wrapper div with flexbox for alignment */}
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          {...field}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImageFile(file);
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setPreviewUrl(imageUrl);
                            } else {
                              setPreviewUrl(null);
                            }
                          }}
                          className="  placeholder-gray-400 cursor-pointer w-full sm:w-64 md:w-96 max-w-full" // Responsive width
                        />

                        {/* Upload button */}
                        <GlobalTooltip content="Upload Image">
                          <Button
                            type="button"
                            disabled={imageLoader}
                            variant="default"
                            className="w-auto py-3 border border-white  transition-colors duration-200 ease-in-out hover:hover:"
                            onClick={handleImageUpload}
                          >
                            {imageLoader ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                              </>
                            ) : (
                              <>
                                <UploadCloudIcon />
                              </>
                            )}
                          </Button>
                        </GlobalTooltip>
                        <GlobalTooltip content="Preview Image">
                          {previewUrl && (
                            <Button
                              variant="default"
                              className="w-auto py-1 border  border-white  transition-colors duration-200 ease-in-out hover:hover:"
                              type="button"
                              onClick={() => {
                                setIsPreviewModalOpen(true);
                              }}
                            >
                              <Image />
                            </Button>
                          )}
                        </GlobalTooltip>
                      </div>
                    </FormControl>
                    {/* Add max size text below the input */}
                    <p className="text-sm text-gray-400 mt-1">Max size: 2MB</p>
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
                        className="  placeholder-gray-400"
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
                        className="  placeholder-gray-400"
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
                        placeholder="Course Duration"
                        {...field}
                        className="  placeholder-gray-400"
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
                              "w-full justify-start text-left font-normal   transition-colors duration-200 ease-in-out hover:hover:", // Added hover styles
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
                        <PopoverContent className="w-auto p-0  ">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            } // Convert to Date object
                            onSelect={(selectedDate) => {
                              field.onChange(selectedDate); // Set value directly in the form state
                            }}
                            initialFocus
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
                <MotionButton>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="default"
                    className="w-auto py-3 border border-white   transition-colors duration-200 ease-in-out hover:hover:"
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
                </MotionButton>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNewStudent;
