import Role from "@/app/model/Role";
import User from "@/app/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { message: "Please provide role id" },
      { status: 400 }
    );
  }
  try {
    // Check if any role is associated with any user
    const roleExists = await User.exists({ role: id });
    if (roleExists) {
      return NextResponse.json(
        {
          message: "Cannot delete this Role as it is associated with a User.",
        },
        { status: 400 }
      );
    }

    // Proceed to delete if no course is associated
    const deleted = await Role.findByIdAndDelete(id);
    if (deleted) {
      return NextResponse.json({
        message: "Role  Deleted Successfully",
      });
    } else {
      return NextResponse.json({ message: "Role Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting Role:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the Role." },
      { status: 500 }
    );
  }
}
