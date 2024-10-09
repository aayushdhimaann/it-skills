import Role from "@/app/model/Role";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const roles = await Role.find(
      { roleTitle: { $ne: "Super Admin" } },
      "_id roleTitle"
    );
    if (roles) {
      return NextResponse.json({
        status: 200,
        success: true,
        roles,
      });
    }
    return NextResponse.json({
      status: 400,
      error: true,
      roles: [],
      message: "no roles found",
    });
  } catch (error) {
    console.log("Error in fetching roles", error);
  }
}
