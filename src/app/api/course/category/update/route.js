import CourseCategory from "@/app/model/CourseCategory";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.id || !data.title) {
      return NextResponse.json(
        { success: false, message: "Category ID and title are required" },
        { status: 400 }
      );
    }

    // Check if title is empty
    if (data.title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title cannot be empty" },
        { status: 400 }
      );
    }

    // Validate `id` format as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(data.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID format" },
        { status: 400 }
      );
    }

    // Check if the category exists
    const updated = await CourseCategory.findByIdAndUpdate(data.id, {
      title: data.title,
    });

    if (updated) {
      return NextResponse.json(
        {
          success: true,
          message: "Category updated successfully",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Category not found",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
