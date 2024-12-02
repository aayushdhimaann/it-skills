import Role from "@/app/model/Role";
import addRoleSchema from "@/app/schemas/addRoleSchema";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsedData = addRoleSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: parsedData.error.errors,
        },
        { status: 400 }
      );
    }

    const { title } = parsedData.data;

    const existingRole = await Role.findOne({ roleTitle: title });
    // console.log("existing role is : ", existingRole);
    if (existingRole) {
      return NextResponse.json(
        { success: false, message: "Role already exists" },
        { status: 409 }
      ); // Conflict status code
    }

    const newRole = new Role({ roleTitle: title });

    const insertNewRole = await newRole.save();

    return NextResponse.json(
      {
        success: true,
        message: "Role added successfully",
        role: insertNewRole,
      },
      { status: 201 }
    );
  } catch (error) {
<<<<<<< HEAD
    // console.log(error);
=======
    console.log(error);
>>>>>>> 110ebfb3d2a6312cc2a8bc8b89fd347b3e11cee5
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
