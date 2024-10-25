"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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

const ContactUs = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const form = useForm({
    defaultValues: {
      username: "",
      number: "",
      bio: "",
    },
  });

  const onSubmitHandler = async (data) => {
    try {
      setIsLoading(true);
      console.log("object");
      const response = await axios.post(`/api/contactus`, data);
      if (response.data.status == 200) {
        toast({
          title: "Success",
          description: response.data.message,
          variant: "success",
        });
        router.replace("/");
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

  return (
    <div className="flex justify-center mt-10 items-start min-h-screen bg-grey-100">
      <div className="w-full max-w-md p-8 space-y-8 border rounded-lg shadow-md ">
        <div className="text-center">
          <h3 className="text-4xl tracking-tight lg:text-3xl mb-6">
            Contact Us
          </h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
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
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="+91 XX XX XX XX XX"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descritpion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="write your query here ..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

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
                "Send"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
