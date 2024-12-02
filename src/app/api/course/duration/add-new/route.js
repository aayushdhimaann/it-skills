import CourseDuration from "@/app/model/CourseDuration";
import addCourseDurationSchema from "@/app/schemas/addCourseDurationSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsedData = addCourseDurationSchema.safeParse(body);
    // console.log(parsedData);

    if (!parsedData) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: parsedData.error.errors, // Return validation errors
        },
        { status: 400 }
      );
    }

    const { title } = parsedData.data;
    const newDuration = new CourseDuration({
      title,
    });
    await newDuration.save();
    return NextResponse.json(
      { success: true, message: "Course  Duration Saved Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save duration" },
      { status: 500 }
    );
  }
}
