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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

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
    <div>
      <div className="flex justify-center mt-10 items-start min-h-screen  ">
        <Card className="rounded-l-2xl rounded-r-none bg-white shadow-lg p-6 bg-slate-800 text-slate-400 930px:hidden">
          <CardHeader className="text-left mb-6">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <MapPin className="mr-2 text-slate-400" />
              ADDRESS
            </CardTitle>
            <CardDescription className="text-slate-400 mb-2">
              Gandhi Colony, Muzaffarnagar, Uttar Pradesh 251001
            </CardDescription>
            <hr className="my-2 border-gray-300" />
          </CardHeader>

          <CardContent className="text-left mb-6">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <Phone className="mr-2 text-slate-400" />
              CONTACTS
            </CardTitle>
            <br />
            <p className="text-slate-400 flex items-center mt-2">
              Phone 1: <strong className="ml-2">+91 12345 67890</strong>
            </p>
            <p className="text-slate-400 flex items-center mt-2">
              Phone 2: <strong className="ml-2">+91 98765 43210</strong>
            </p>
            <hr className="my-2 border-gray-300" />
            <br />
            <CardTitle className="text-slate-400 flex items-center mt-2">
              <Mail className="mr-2 text-slate-400" />
              Email:
            </CardTitle>
            <br />
            <p className="text-slate-400 mt-1">
              <strong>example@gmail.com</strong>
            </p>
          </CardContent>

          <CardFooter className="text-left"></CardFooter>
        </Card>

        <div className="w-full max-w-md p-8 space-y-8 border  rounded-r-2xl shadow-md 930px:border-l-gray-900 border-4">
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

              <Button
                type="submit"
                disabled={isLoading}
                variant="default"
                className="h-11 w-52 text-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait....
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
