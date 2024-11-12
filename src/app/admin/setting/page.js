"use client";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Pencil, Plus, Trash } from "lucide-react";
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
import EditSetting from "@/components/EditSetting";

const Setting = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);

  // displaying the modal
  const [modalDisplay, setModalDisplay] = useState(false);

  // for deletion
  const [categoryId, setCatogoryId] = useState(null);
  const [roleId, setRoleId] = useState(null);

  const [singleCategory, setSingleCategory] = useState({});
  const [singleRole, setSingleRole] = useState({});
  const [activeTab, setActiveTab] = useState("course-category"); // Track active tab
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const token = session?.user._accessToken;

  // making an object for sending fields to modal
  const [modalValue, setModalValue] = useState({});

  // function to add a new Category or Role
  const addSubmitHandler = async (data) => {
    // console.table("add ", data);
    // validation
    if (data.title == "") {
      toast({
        title: "Error",
        description: "Please enter category title!",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    let response;
    try {
      if (data.section === "category") {
        // console.log("category");
        response = await axios.post(
          "/api/course/category/add-new",
          {
            title: data.title,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (data.section === "Role") {
        response = await axios.post(
          "/api/roles/add-new",
          {
            title: data.title,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // console.log(response);

      if (response.status == 200 || response.status == 201) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        setModalDisplay(false);
        fetchCategories();
        fetchRoles();
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      // console.warn(error);
      if (error.status === 409)
        toast({
          title: "Error",
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      else
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
      setModalDisplay(false);
    }
  };

  // function to handle the submit method
  const editSubmitHandler = async (data) => {
    // console.log("i am submit handler from page jsx ", data);
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
      let response;

      if (data.section === "Category") {
        response = await axios.post(
          "/api/course/category/update",
          {
            title: data.title,
            id: data.idField,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.clear();
        // console.log("response of edit Category", response);
      } else if (data.section === "Roles") {
        // console.log(data);

        response = await axios.post(
          "/api/roles/update",
          {
            title: data.title,
            id: data.idField,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (response.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        setModalDisplay(false);
        data.section === "Category" ? fetchCategories() : fetchRoles();
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
      setModalDisplay(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    const response = await axios.get("/api/course/category/get-all");
    if (response.status === 200) {
      setCategories(response.data.courseCategories);
    } else {
      setCategories([]);
    }
  };

  // Fetch all roles
  const fetchRoles = async () => {
    const response = await axios.get("/api/roles/get-roles");
    if (response.status === 200) {
      setRoles(response.data.roles);
    } else {
      setRoles([]);
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

  // Handle delete Role
  const handleRoleDelete = async () => {
    try {
      const response = await axios.post("/api/roles/delete", {
        id: roleId,
      });
      if (response.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        fetchRoles();
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
    const category = categories.find((item) => item._id == id);
    // console.log(category);

    setSingleCategory(category);

    setModalValue({
      title: "Category",
      _id: category._id,
      formVal: {
        category: "",
      },
      resetVal: category.title,
      open: true,
      submitHandle: editSubmitHandler,
    });
    setModalDisplay(true);
  };

  // handle role edit
  const editRole = (id) => {
    const role = roles.find((item) => item._id == id);
    setSingleCategory(role);

    setModalValue({
      title: "Roles",
      _id: role._id,
      formVal: {
        role: "",
      },
      resetVal: role.roleTitle,
      open: true,
      submitHandle: editSubmitHandler,
    });
    setModalDisplay(true);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchCategories();
      fetchRoles();
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
        {modalDisplay && <EditSetting data={modalValue} />}

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
                {/* Add a new Course Category or a Role */}
                <div className=" flex justify-end items-center px-5 py-3">
                  <div className="border-slate-50 border-2 rounded-md  py-0 px-1">
                    <GlobalTooltip content="Add New Course Category">
                      <Plus
                        className="cursor-pointer w-4"
                        onClick={() => {
                          setModalValue({
                            action: "add",
                            title: "category",
                            formVal: {
                              category: "",
                            },
                            open: true,
                            resetVal: "",
                            submitHandle: addSubmitHandler,
                          });
                          setModalDisplay(true);
                        }}
                      />
                    </GlobalTooltip>
                  </div>
                </div>
                <div
                  className={`${
                    categories.length === 0
                      ? "border-none"
                      : "border rounded-sm overflow-hidden "
                  }`}
                >
                  {categories.length === 0 ? (
                    <Spinner size="medium" />
                  ) : (
                    <Table className="w-full border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] text-center p-3">
                            S. No.
                          </TableHead>
                          <TableHead className="text-center p-3">
                            Title
                          </TableHead>
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
                                      <AlertDialogTitle>
                                        Delete
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Do you really want to delete this
                                        course?
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
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="role">
              <motion.div
                key="course-category"
                initial={{ opacity: 0, x: -1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className=" flex justify-end items-center px-5 py-3">
                  <div className="border-slate-50 border-2 rounded-md  py-0 px-1">
                    <GlobalTooltip content="Add New Role">
                      <Plus
                        className="cursor-pointer w-4"
                        onClick={() => {
                          setModalValue({
                            action: "add",
                            title: "Role",
                            formVal: {
                              role: "",
                            },
                            open: true,
                            resetVal: "",
                            submitHandle: addSubmitHandler,
                          });
                          setModalDisplay(true);
                        }}
                      />
                    </GlobalTooltip>
                  </div>
                </div>
                <div
                  className={`${
                    roles.length === 0
                      ? "border-none"
                      : "border rounded-sm overflow-hidden "
                  }`}
                >
                  {roles.length === 0 ? (
                    <Spinner size="medium" />
                  ) : (
                    <Table className="w-full border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] text-center p-3">
                            S. No.
                          </TableHead>
                          <TableHead className="text-center p-3">
                            Title
                          </TableHead>
                          <TableHead className="text-center p-3">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((item, index) => (
                          <TableRow
                            className="text-center border-b"
                            key={item._id}
                          >
                            <TableCell className="p-3 font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="p-3">
                              {item.roleTitle}
                            </TableCell>
                            <TableCell className="p-3">
                              <div className="flex justify-center space-x-2">
                                <GlobalTooltip content="Edit">
                                  <Pencil
                                    className="cursor-pointer w-4"
                                    onClick={() => {
                                      editRole(item._id);
                                    }}
                                  />
                                </GlobalTooltip>
                                <AlertDialog>
                                  <AlertDialogTrigger>
                                    <GlobalTooltip content="Delete">
                                      <Trash
                                        className="cursor-pointer w-4"
                                        onClick={() => setRoleId(item._id)}
                                      />
                                    </GlobalTooltip>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Do you really want to delete this
                                        course?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel
                                        onClick={() => setRoleId(null)}
                                      >
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          handleRoleDelete();
                                          setRoleId(null);
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
                  )}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Setting;
