import Aboutus from "@/app/model/About";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();

  console.log(id);

  if (!id) {
    return NextResponse.json(
      { message: "Please provide role id" },
      { status: 400 }
    );
  }

  try {
    const deleteField = await Aboutus.findOneAndUpdate(
      {
        [`data.${id}`]: { $exists: true },
      },
      {
        $unset: { [`data.${id}`]: "" },
      },
      { new: true }
    );

    if (deleteField) {
      return NextResponse.json(
        {
          message: "Field  Deleted Successfully",
          success: true,
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Field Not Found" }, { status: 404 });
  } catch (error) {
    console.error("Error deleting About:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the About Field." },
      { status: 500 }
    );
  }
}
