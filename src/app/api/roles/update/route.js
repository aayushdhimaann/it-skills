import Role from "@/app/model/Role";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // required validation
    if (!data.id || !data.title) {
      return NextResponse.json(
        {
          success: false,
          message: "Role ID and title of role are required",
        },
        {
          status: 400,
        }
      );
    }

    // check for empty conditions
    if (data.title.trim() == "") {
      return NextResponse.json(
        {
          success: false,
          messsage: "title of role cannot be left empty",
        },
        { status: 400 }
      );
    }

    // validate id if it's valid 24-hexadecimal format exists in database
    if (!mongoose.Types.ObjectId.isValid(data.id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Role Format",
        },
        { status: 400 }
      );
    }

    // check if the roles exists
    const updated = await Role.findByIdAndUpdate(
      data.id,
      {
        roleTitle: data.title,
      },
      { new: true }
    );
    // console.log("title : " + data.title);

    // console.log("updated : " + updated);

    if (updated) {
      return NextResponse.json(
        {
          success: true,
          message: "Role updated Successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Role not found",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
