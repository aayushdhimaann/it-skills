import Aboutus from "@/app/model/About";
import addAboutSchema from "@/app/schemas/addAboutSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Establish DB connection
    await dbConnect();

    // Parse the incoming JSON data
    const body = await req.json();
    const parsedData = addAboutSchema.safeParse(body);

    console.log(parsedData); // Log parsed data to debug

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
        },
        {
          status: 400,
        }
      );
    }

    // Destructure the data
    const { field, value } = parsedData.data;

    const topUpdateField = await Aboutus.findOneAndUpdate(
      { [field]: { $exists: true } },
      { $set: { [field]: value } },
      { new: true }
    );

    if (topUpdateField)
      return NextResponse.json(
        {
          success: true,
          message: `${field} updated successfully`,
          topUpdateField,
        },
        {
          status: 200,
        }
      );

    // if that field is in data object
    const updateField = await Aboutus.findOneAndUpdate(
      { [`data.${field}`]: { $exists: true } },
      { $set: { [`data.${field}`]: value } },
      { new: true, upsert: true }
    );

    if (updateField)
      return NextResponse.json(
        {
          success: true,
          message: `${field} updated successfully`,
          updateField,
        },
        {
          status: 200,
        }
      );
    return NextResponse.json(
      {
        success: false,
        message: "This field doesn't exists",
      },
      {
        status: 409,
      }
    );
  } catch (error) {
    console.log(error); // Log error for debugging

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
