"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import { getSession, signIn } from "next-auth/react";
import { signInSchema } from "@/app/schemas/signInSchema";
import { Loader2 } from "lucide-react";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    // validation
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response.status == 200) {
        toast({
          title: "Success",
          description: "User Logged in successfully",
          variant: "success",
        });
        const session = await getSession();
        if (
          session.user._role === "6706bc9fff27bd499083aac2" ||
          session.user._role === "6706bd8dff27bd499083aac3"
        ) {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/");
        }
      } else {
        toast({
          title: "Error",
          description: "Error in Login",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error in Login",
        variant: "destructive",
      });
      console.log(error + " error in login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey-100 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md m-3">
        <div className="text-center">
          <h3 className="text-4xl tracking-tight lg:text-3xl mb-6">Login</h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="space-y-6"
          >
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
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Link href="/sign-up" className="text-blue-500 underline">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
