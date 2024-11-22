import { NextResponse } from "next/server";
import Student from "@/app/model/Student";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Query students where deposited_fee is less than course_fee
    const studentsWithFeeDue = await Student.aggregate([
      {
        $addFields: {
          course_fee_numeric: { $toDouble: "$course_fee" },
          deposited_fee_numeric: { $toDouble: "$deposited_fee" },
        },
      },
      {
        $match: {
          $expr: {
            $lt: ["$deposited_fee_numeric", "$course_fee_numeric"],
          },
        },
      },
    ]);

    // Return the results as a JSON response using NextResponse
    return NextResponse.json(studentsWithFeeDue, { status: 200 });
  } catch (error) {
    console.error("Error fetching students with fee due:", error);

    // Return error message as JSON response
    return NextResponse.json(
      { error: "Unable to fetch students" },
      { status: 500 }
    );
  }
}
