const { z } = require("zod");

const addAboutSchema = z.object({
  field: z.string().min(1, { message: "Field is required" }),
  value: z.string().min(1, { message: "field's value is required" }),
});

export default addAboutSchema;
