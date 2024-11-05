import Student from "@/app/model/Student";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const studData = await Student.find();

    if (studData)
      return NextResponse.json({ success: true, studData }, { status: 200 });

    return NextResponse.json(
      { success: false, message: "no student found" },
      { status: 404 }
    );
  } catch (error) {
    console.log("error : " + error);

    return NextResponse.json(
      {
        success: false,
        message: "failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}
