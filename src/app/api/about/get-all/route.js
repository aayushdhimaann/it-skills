import Aboutus from "@/app/model/About";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const aboutUsData = await Aboutus.find();
    console.log(aboutUsData);

    if (aboutUsData) {
      return NextResponse.json(
        {
          success: true,
          aboutUsData,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No details found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
