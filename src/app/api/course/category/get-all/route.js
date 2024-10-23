import CourseCategory from "@/app/model/CourseCategory";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const courseCategories = await CourseCategory.find();

    if (courseCategories) {
      return NextResponse.json(
        { success: true, courseCategories },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No categories found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching course categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
