import Student from "@/app/model/Student";
import addStudentSchema from "@/app/schemas/addStudentSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
    const parsedData = addStudentSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.errors, // Return validation errors
      });
    }

    const {
      branch,
      date_of_admission,
      course_name,
      course_duration,
      student_name,
      father_name,
      father_occupation,
      date_of_birth,
      education_details,
      address,
      phone,
      phone_alt, // Optional field
      email,
      course_fee,
      deposited_fee,
      certi_date,
    } = parsedData.data;

    const newStudent = new Student({
      branch,
      date_of_admission,
      course_name,
      course_duration,
      student_name,
      father_name,
      father_occupation,
      date_of_birth,
      education_details,
      address,
      phone,
      email,
      course_fee,
      deposited_fee,
      certi_date,
      photo: body.photo,
      phone_alt: phone_alt ? phone_alt : phone,
    });
    const insertedStudent = await newStudent.save();

    return NextResponse.json({
      success: true,
      message: "Student added successfully",
      student: insertedStudent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Server error",
    });
  }
}
