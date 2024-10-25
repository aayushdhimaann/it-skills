import Course from "@/app/model/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  try {
    const deleted = await Course.findByIdAndDelete(id); // Use findByIdAndDelete for more direct deletion by ID
    if (deleted) {
      return NextResponse.json({ message: "Course Deleted Successfully" });
    } else {
      return NextResponse.json(
        { message: "Course Not Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the course." },
      { status: 500 }
    );
  }
}
