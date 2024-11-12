import { z } from "zod";

const addCourseCategorySchema = z.object({
  title: z.string().min(1, { message: "Course category is required" }),
});

export default addCourseCategorySchema;
