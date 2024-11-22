import Course from "@/app/model/Course";
import Student from "@/app/model/Student";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Step 1: Define an array of all months with their names
    // Step 2: Get the current year
    const currentYear = new Date().getFullYear();
    const allMonths = [
      { _id: 1, monthName: `January ${currentYear}` },
      { _id: 2, monthName: `February ${currentYear}` },
      { _id: 3, monthName: `March ${currentYear}` },
      { _id: 4, monthName: `April ${currentYear}` },
      { _id: 5, monthName: `May ${currentYear}` },
      { _id: 6, monthName: `June ${currentYear}` },
      { _id: 7, monthName: `July ${currentYear}` },
      { _id: 8, monthName: `August ${currentYear}` },
      { _id: 9, monthName: `September ${currentYear}` },
      { _id: 10, monthName: `October ${currentYear}` },
      { _id: 11, monthName: `November ${currentYear}` },
      { _id: 12, monthName: `December ${currentYear}` },
    ];

    // Step 3: Aggregate student data for the current year by month
    const studentsByMonth = await Student.aggregate([
      {
        $match: {
          date_of_admission: {
            $gte: new Date(`${currentYear}-01-01`), // Start of the current year
            $lte: new Date(`${currentYear}-12-31`), // End of the current year
          },
        },
      },
      {
        $project: {
          month: { $month: "$date_of_admission" }, // Extract the month from date_of_admission
        },
      },
      {
        $group: {
          _id: "$month", // Group by the month
          totalStudents: { $sum: 1 }, // Count the number of students
        },
      },
    ]);

    // Step 4: Map aggregated data to allMonths to ensure all months are included
    const resultForStudent = allMonths.map((month) => {
      const studentData = studentsByMonth.find(
        (item) => item._id === month._id
      );
      return {
        id: month._id,
        monthName: month.monthName,
        Student: studentData ? studentData.totalStudents : 0, // Default to 0 if no students found
      };
    });

    // Step 5: Return the response
    return NextResponse.json({
      message: "Number of students admitted in each month",
      data: resultForStudent,
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return NextResponse.json({
      message: "Error fetching student data",
      error: error.message,
    });
  }
}
