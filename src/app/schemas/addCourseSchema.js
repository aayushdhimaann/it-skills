import { z } from "zod";

const addCourseSchema = z.object({
  name: z.string().min(1, { message: "Course name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  duration: z.number().min(1, { message: "Duration is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});
export default addCourseSchema;
