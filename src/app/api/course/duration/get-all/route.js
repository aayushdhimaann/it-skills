import CourseDuration from "@/app/model/CourseDuration";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const courseDuration = await CourseDuration.find();

    // console.log("I am course Duration");
    // console.log(courseDuration);

    if (courseDuration) {
      return NextResponse.json(
        {
          success: true,
          courseDuration,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: " No Course Duration Found",
      },
      { status: 404 }
    );

    // const courseDuration;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch the course Durations",
      },
      { status: 500 }
    );
  }
}
