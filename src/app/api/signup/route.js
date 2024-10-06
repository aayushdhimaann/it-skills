import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";
import { signupSchema } from "@/app/schemas/signupSchema";
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const parsedData = signupSchema.safeParse(body);

    // Check if the validation failed
    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.errors, // Return validation errors
      });
    }

    const { username, email, password } = parsedData.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message:
          "Your email is already registered with us please do login or reset password!",
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
      status: 400,
      success: false,
      message: "Error registering user",
    });
  }
}
