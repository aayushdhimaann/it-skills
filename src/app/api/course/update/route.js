import { NextResponse } from "next/server";
import Course from "@/app/model/Course"; // Adjust the import based on your directory structure

export async function POST(req) {
  const data = await req.json();

  try {
    // Update the course by ID
    const updatedCourse = await Course.findByIdAndUpdate(
      data.id,
      {
        name: data.name,
        categoryId: data.categoryId,
        description: data.description,
      },
      { new: true, runValidators: true } // Return the updated document and run validation checks
    );

    // Check if the course was found and updated
    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course not found", success: false },
      );
    }

    // Return a success response with the updated course
    return NextResponse.json({
      message: "Course updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Error updating course", success: false, error: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}
