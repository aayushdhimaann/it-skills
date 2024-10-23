import CourseCategory from "@/app/model/CourseCategory";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title } = body;
    if (!title || title == "") {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }
    const existingCategory = await CourseCategory.findOne({ title });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Title already exists" },
        { status: 409 }
      ); // Conflict status code
    }
    const newCategory = new CourseCategory({
      title,
    });
    const savedCategory = await newCategory.save();
    return NextResponse.json(
      { success: true, data: savedCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create category" },
      { status: 500 }
    );
  }
}
