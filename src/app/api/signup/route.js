import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";
import { signupSchema } from "@/app/schemas/signupSchema";
import WelcomeEmail from "@/components/email/WelcomeEmail";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const parsedData = signupSchema.safeParse(body);

    // Check if validation failed
    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.errors, // Return validation errors
      });
    }
    console.log(parsedData);

    const { username, email, password, role } = parsedData.data;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message:
          "Your email is already registered with us, please login or reset password!",
      });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    });
    await newUser.save();

    // Fetch super admin from the database
    const superAdmin = await User.findOne({
      role: "6706bc9fff27bd499083aac2",
    });

    // Send verification email to super admin
    let txtRole = "";
    if (role === "6706bd8dff27bd499083aac3") txtRole = "Admin";
    else txtRole = "Student";
    const htmlContent = WelcomeEmail(username, txtRole);
    const subject = "New User Registered";
    const emailResponse = await sendEmail(
      superAdmin.email,
      subject,
      htmlContent
    );

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
      message: "User Registered Successfully, Super Admin Notified!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "Error registering user",
    });
  }
}
