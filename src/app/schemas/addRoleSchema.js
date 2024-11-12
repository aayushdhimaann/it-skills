import { z } from "zod";

const addRoleSchema = z.object({
  title: z.string().min(1, { message: "Role is required" }),
});

export default addRoleSchema;
