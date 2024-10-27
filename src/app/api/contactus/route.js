import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";
import { sendEmail } from "@/helpers/sendEmail";
import ContactMail from "@/components/email/ContactMail";
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { username, number, bio } = body;
    // fetching superadmin
    const superAdmin = await User.findOne({
      role: "6706bc9fff27bd499083aac2",
    });
    // sending email
    const subject = "New Query";
    const mailContent = ContactMail(username, number, bio);
    await sendEmail(superAdmin.email, subject, mailContent);
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
