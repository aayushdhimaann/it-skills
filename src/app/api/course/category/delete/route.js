import Course from "@/app/model/Course";
import CourseCategory from "@/app/model/CourseCategory";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { message: "Please provide category id" },
      { status: 400 }
    );
  }
  try {
    // Check if any course is associated with this category
    const courseExists = await Course.exists({ categoryId: id });
    if (courseExists) {
      return NextResponse.json(
        { message: "Cannot delete this category as it is associated with a course." },
        { status: 400 }
      );
    }

    // Proceed to delete if no course is associated
    const deleted = await CourseCategory.findByIdAndDelete(id);
    if (deleted) {
      return NextResponse.json({
        message: "Course Category Deleted Successfully",
      });
    } else {
      return NextResponse.json(
        { message: "Category Not Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the category." },
      { status: 500 }
    );
  }
}
