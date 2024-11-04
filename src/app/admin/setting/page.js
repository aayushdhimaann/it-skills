"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Pencil, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import axios from "axios";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Setting = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCatogoryId] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [singleCategory, setSingleCategory] = useState({});
  const [activeTab, setActiveTab] = useState("course-category"); // Track active tab
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const token = session?.user._accessToken;

  // use form
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  // Fetch all categories
  const fetchCategories = async () => {
    const response = await axios.get("/api/course/category/get-all");
    if (response.status === 200) {
      setCategories(response.data.courseCategories);
    } else {
      setCategories([]);
    }
  };

  // Handle delete category
  const handleCategoryDelete = async () => {
    // console.log(categoryId);
    try {
      const response = await axios.post("/api/course/category/delete", {
        id: categoryId,
      });
      if (response.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // handle category edit
  const editCategory = (id) => {
    setEditDialogOpen(true);
    const category = categories.find((item) => item._id == id);
    setSingleCategory(category);
    reset({
      title: category.title,
    });
  };

  // handle category submit
  const onSubmit = async (data) => {
    // validation
    if (data.title == "") {
      toast({
        title: "Error",
        description: "Please enter category title!",
        variant: "destructive",
      });
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/course/category/update",
        {
          ...data,
          id: singleCategory._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        setEditDialogOpen(false);
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: response.data.message,
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

  useEffect(() => {
    if (status === "authenticated") {
      fetchCategories();
    }
  }, [status]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Settings Heading */}
        <h1 className="text-2xl font-bold mb-4">
          <span className="border-b-4">Settings</span>
        </h1>

        {/* Info Alert */}
        <Alert
          variant="info"
          className="flex items-start p-4 border-l-4 rounded-lg shadow-md"
        >
          <AlertCircle className="h-5 w-5 mr-2" />
          <AlertTitle className="font-semibold">Info</AlertTitle>
          <AlertDescription>
            Manage course categories, roles, and much more!
          </AlertDescription>
        </Alert>

        {/* dialog for editing */}
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] w-full mx-auto p-6 my-5">
            <DialogHeader className="text-center">
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <DialogDescription className="pt-4">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="grid grid-cols-1 gap-4"
                >
                  {/* Course Name Field */}
                  <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Category Title"
                            {...field}
                            className="text-white placeholder-gray-500 transition duration-150 ease-in-out focus:ring focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center mt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-auto px-8 py-2"
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
            </DialogDescription>
          </DialogContent>
        </Dialog>

        {/* Tabs with Animated Indicator */}
        <motion.div
          className="my-3"
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs
            defaultValue="course-category"
            className="min-w-full"
            onValueChange={(value) => setActiveTab(value)} // Set active tab
          >
            <TabsList className="relative grid w-full grid-cols-2">
              <TabsTrigger value="course-category">Course Category</TabsTrigger>
              <TabsTrigger value="role">Role</TabsTrigger>
            </TabsList>

            {/* Animated Tab Content */}
            <TabsContent value="course-category">
              <motion.div
                key="course-category"
                initial={{ opacity: 0, x: -1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border rounded-sm overflow-hidden">
                  <Table className="w-full border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] text-center p-3">
                          S. No.
                        </TableHead>
                        <TableHead className="text-center p-3">Title</TableHead>
                        <TableHead className="text-center p-3">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((item, index) => (
                        <TableRow
                          className="text-center border-b"
                          key={item._id}
                        >
                          <TableCell className="p-3 font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="p-3">{item.title}</TableCell>
                          <TableCell className="p-3">
                            <div className="flex justify-center space-x-2">
                              <GlobalTooltip content="Edit">
                                <Pencil
                                  className="cursor-pointer w-4"
                                  onClick={() => {
                                    editCategory(item._id);
                                  }}
                                />
                              </GlobalTooltip>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <GlobalTooltip content="Delete">
                                    <Trash
                                      className="cursor-pointer w-4"
                                      onClick={() => setCatogoryId(item._id)}
                                    />
                                  </GlobalTooltip>
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
                                      onClick={() => setCatogoryId(null)}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleCategoryDelete();
                                        setCatogoryId(null);
                                      }}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="role">
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Setting;
