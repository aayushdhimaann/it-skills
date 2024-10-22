import Course from "@/app/model/Course";
import addCourseSchema from "@/app/schemas/addCourseSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsedData = addCourseSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.errors, // Return validation errors
      });
    }
    const { name, description, category } = parsedData.data;
    const newCourse = new Course({
      name,
      description,
      categoryId: category,
    });
    await newCourse.save();
    return NextResponse.json(
      { success: true, message: "Course Saved Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving course:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save course" },
      { status: 500 }
    );
  }
}
