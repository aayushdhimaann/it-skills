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

    console.log(`Field: ${field}, Value: ${value}`); // Log the field and value

    // Check if the field already exists in the Aboutus collection
    const existingField = await Aboutus.findOne({ field });
    console.log("Existing Field:", existingField);

    // Check if the field exists in the 'data' object (this is for dynamic fields)
    const existingDataField = await Aboutus.findOne({
      [`data.${field}`]: { $exists: true },
    });
    console.log("Existing Data Field:", existingDataField);

    // If the field or data already exists, return a conflict response
    if (existingField || existingDataField) {
      return NextResponse.json(
        {
          success: false,
          message: "This field already exists",
        },
        {
          status: 409,
        }
      );
    }

    // Add or update the dynamic field inside `data`
    const newField = await Aboutus.findOneAndUpdate(
      {},
      { $set: { [`data.${field}`]: value } },
      { new: true, upsert: true }
    );

    console.log("New Field Created:", newField);

    return NextResponse.json(
      {
        success: true,
        message: `${field} created successfully`,
        newField,
      },
      {
        status: 201,
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
