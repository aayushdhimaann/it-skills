"use client";
import axios from "axios";
// import ViewFilter from "@/components/ui/Admin/ViewFilter";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/app/loading";
const ViewAllStudent = () => {
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  // state to manage the data of all the students
  const [students, setStudents] = useState([]);

  // table fields
  const tableFields = [
    "S. no",
    "Photo",
    "Student Name",
    "Father Name",
    "Email",
    "Phone Number",
    "Alternate Phone Number",
    "Address",
    "Branch",
    "Course Name",
    "Date of Admission",
    "Date of Birth",
  ];
  const fetchAllStudent = async () => {
    try {
      const response = await axios.get("/api/student/view-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.studData);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  useEffect(() => {
    if (status == "authenticated") {
      fetchAllStudent();
    }
  }, [status]);
  return (
    <>
      {students.length === 0 ? (
        <Loading />
      ) : (
        <div className="min-h-screen p-2">
          <div className=" h-12 w-full flex justify-between items-center p-3">
            <h1>View All Students</h1>
            <Link href="/admin/student/add-new" className="hover:underline">
              Add New Student
            </Link>
          </div>

          <div className="mx-3 border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-bgtheme2 group hover:text-bgtheme1">
                  {tableFields.map((heading, ind) => (
                    <TableHead className="group-hover:text-bgtheme1" key={ind}>
                      {heading}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, i) => {
                  return (
                    <TableRow
                      key={student._id}
                      className="hover:bg-bgtheme2 group hover:text-bgtheme1 text-slate-400"
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="group-hover:text-bgtheme1">
                        <Image
                          src={student.photo}
                          alt="student image"
                          height={220}
                          width={100}
                        />
                      </TableCell>
                      <TableCell>{student.student_name}</TableCell>
                      <TableCell>{student.father_name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.phone_alt}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.course_name}</TableCell>
                      <TableCell>
                        {new Date(student.date_of_birth).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(student.date_of_admission).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default ViewAllStudent;
