import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";
export async function POST(request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "User exists with this email",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // send verification email
      const emailResponse = await sendEmail(email);
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
        message: "User Registered Successfully!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error registering user",
    });
  }
}
