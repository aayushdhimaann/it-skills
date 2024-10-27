import { z } from "zod";

const addStudentSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  date_of_admission: z.string().min(1, "Date of admission is required"),
  course_name: z.string().min(1, "Course name is required"),
  course_duration: z.string().min(1, "Course duration is required"),
  student_name: z.string().min(1, "Student name is required"),
  father_name: z.string().min(1, "Father's name is required"),
  father_occupation: z.string().min(1, "Father's occupation is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
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
  deposited_fee: z.string().min(1, "Deposited fee is required"),
  certi_date: z.string().min(1, "Certificate Due is required"),
});

export default addStudentSchema;
