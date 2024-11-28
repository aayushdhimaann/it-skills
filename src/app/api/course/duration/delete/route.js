import CourseDuration from "@/app/model/CourseDuration";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();
    // console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: "Please provide duration id" },
        { status: 400 }
      );
    }
    // Proceed to delete if no course is associated
    const deleted = await CourseDuration.findByIdAndDelete(id);
    if (deleted) {
      return NextResponse.json({
        message: "Course Duration  Deleted Successfully",
      });
    }
    return NextResponse.json({ message: "Role Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Course Duration Not Found" },
      { status: 500 }
    );
  }
}
