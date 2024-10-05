"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({defaultValues:{
    username : '',
    password : ''
  }})
  return <div>sign in</div>;
};

export default page;
