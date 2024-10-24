import Course from "@/app/model/Course";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find().populate('categoryId');

    if (courses) {
      return NextResponse.json(
        { success: true, courses },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No courses found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
