import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Email must be a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .min(1, "Password is required"),
});