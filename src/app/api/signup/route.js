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

    // Check if validation failed
    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid input data",
        errors: parsedData.error.errors, // Return validation errors
      });
    }

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
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({
    //   username,
    //   email,
    //   password: hashedPassword,
    //   role,
    // });
    // await newUser.save();

    // Fetch super admin from the database
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
    console.log("sending email");

    // Send verification email to super admin
    const emailResponse = await sendEmail(
      superAdmin.email,
      superAdmin.username
    );
    console.log(emailResponse);

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
