import { z } from "zod";

const addStudentSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  date_of_admission: z
    .preprocess((val) => new Date(val), z.date())
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format for Date of Admission",
    }),
  course_name: z.string().min(1, "Course name is required"),
  course_duration: z.number().min(1, "Course duration is required"),
  student_name: z.string().min(1, "Student name is required"),
  father_name: z.string().min(1, "Father's name is required"),
  father_occupation: z.string().min(1, "Father's occupation is required"),
  date_of_birth: z
    .preprocess((val) => new Date(val), z.date())
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format for Date of Birth",
    }),
  education_details: z
    .array(
      z.object({
        education: z.string().min(1, "Education is required"),
        university: z.string().min(1, "University is required"),
        year: z.string().min(1, "Year is required"),
        division: z.string().min(1, "Division is required"),
        percentage: z.string().min(1, "Percentage is required"),
      })
    )
    .min(1, "At least one education detail is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Contact number is required"),
  phone_alt: z.string().optional(),
  email: z.string().email("Invalid email address"),
  course_fee: z.string().min(1, "Course fee is required"),
  deposited_fee: z.string().min(1, "Admission fee is required"),
  certi_date: z
    .preprocess((val) => new Date(val), z.date())
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format for Certificate Due Date",
    }),
});

export default addStudentSchema;
