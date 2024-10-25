import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";
import { signupSchema } from "@/app/schemas/signupSchema";
import { sendContactQuery } from "@/helpers/sendContactQuery";
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    console.log(body);
    const { username, number, bio } = body;
    const superAdmin = await User.findOne({
      role: "6706bc9fff27bd499083aac2",
    });
    if (!superAdmin) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Super admin not found",
      });
    }
    const emailResponse = await sendContactQuery(username, number, bio);

    if (!emailResponse.success) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: emailResponse.message,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Query send Successfully ",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      status: 400,
      success: false,
      message: "Error sending request",
    });
  }
}
