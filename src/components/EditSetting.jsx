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
function EditSetting({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(data.open);

  console.log(data);
  // use form
  const form = useForm({
    defaultValues: {
      ...data.formVal,
    },
  });
  const { control, handleSubmit, reset } = form;
  useEffect(() => {
    reset({
      title: data.resetVal,
    });
  }, [data.resetVal]);
  useEffect(() => {
    setEditDialogOpen(data.open);
  }, [data]);

  return (
    <div>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] w-full mx-auto p-6 my-5">
          <DialogHeader className="text-center">
            <DialogTitle>
              {data?.action === "add" ? "Add" : "Edit"} {data.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="pt-4">
            <Form {...form}>
              <form
                onSubmit={handleSubmit((updatedData) => {
                  console.log(updatedData);
                  data?.action === "add"
                    ? data.submitHandle({
                        section: data.title,
                        ...updatedData,
                      })
                    : data.submitHandle({
                        section: data.title,
                        ...updatedData,
                        idField: data._id,
                      });
                })}
                method="post"
                className="grid grid-cols-1 gap-4"
              >
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{data.title} Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter ${data.title} Title`}
                          {...field}
                          className="text-white placeholder-gray-500 transition duration-150 ease-in-out focus:ring focus:ring-opacity-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
    </div>
  );
}

export default EditSetting;
