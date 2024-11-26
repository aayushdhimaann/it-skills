import { z } from "zod";

const addCourseDurationSchema = z.object({
  title: z.string().min(1, { message: "Duration is required" }),
});

export default addCourseDurationSchema;
