"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signupSchema } from "@/app/schemas/signupSchema";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const form = useForm({
    // validation
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/signup`, data);
      if (response.data.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        router.replace("/sign-in");
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
        description: "Error in Signup",
        variant: "destructive",
      });
      console.log(error + " error in signup");
    } finally {
      setIsLoading(false);
    }
  };

  // getting roles

  const getRoles = async () => {
    const response = await axios.get("/api/get-roles");
    if (response.status == 200) {
      setRoles(response.data.roles);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey-100">
      <div className="w-full max-w-md p-8 space-y-8 mt-12 border rounded-lg shadow-md m-3">
        <div className="text-center">
          <h3 className="text-4xl tracking-tight lg:text-3xl mb-6">Sign Up</h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                    <Eye />
                    <Input type="text" placeholder="********" {...field} />
                    <EyeOff />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Role Selection */}
            <Alert variant="info">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                If you select the Admin role, an email will be sent to the Admin
                with a verification code. You will need to retrieve that code
                for account verification.{" "}
              </AlertDescription>
            </Alert>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-4">
                    <FormLabel>Select Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.roleTitle}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} variant="default">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait....
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <div>
          Already Registered?{" "}
          <Link href="/sign-in" className="text-blue-500 underline">
            Click here
          </Link>{" "}
          to login!
        </div>
      </div>
    </div>
  );
};

export default Signup;
