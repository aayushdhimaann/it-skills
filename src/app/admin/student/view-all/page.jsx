"use client";
import axios from "axios";
// import ViewFilter from "@/components/ui/Admin/ViewFilter";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/app/loading";
import ViewFilter from "@/components/ui/Admin/ViewFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import GlobalTooltip from "@/components/ui/GlobalTooltip";
const ViewAllStudent = () => {
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  // state to manage the data of all the students
  const [students, setStudents] = useState([]);
  const [filterStudentData, setFilterStudentData] = useState(students);
  const [filterVal, setFilterVal] = useState("");
  const [progress, setProgress] = useState(10);

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
    "Course Fee",
    "Deposited Fee",
    "Date of Admission",
    "Date of Birth",
    "Action",
  ];
  const fetchAllStudent = async () => {
    try {
      const response = await axios.get("/api/student/view-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.studData);
      setStudents(response.data.studData);
      setFilterStudentData(response.data.studData);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 500);
    if (status == "authenticated") {
      fetchAllStudent();
    }
    return () => clearTimeout(timer);
  }, [status]);

  // use effect to fetch the filtered students
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.student_name.toLowerCase().includes(filterVal.toLowerCase())
    );
    setFilterStudentData(filtered);
  }, [filterVal, students]);
  return (
    <motion.div
      className="min-h-screen p-2"
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-auto w-full flex flex-col sm:flex-row justify-between items-center mb-4 p-3 space-y-3 sm:space-y-0 sm:space-x-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="border-b-4">View All Students</span>
        </h1>
        <Link
          href="/admin/student/add-new"
          className="text-base sm:text-lg font-medium hover:underline"
        >
          Add New Student
        </Link>
      </div>
      <div className="h-12 mb-4 p-3 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search by Name"
          className="w-full sm:w-80 md:w-96 h-10 px-4 text-sm border border-gray-300 focus:outline-none"
          value={filterVal}
          onChange={(e) => setFilterVal(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => setFilterVal("")} // Clear the input
        >
          Clear
        </Button>
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
          {filterStudentData.length === 0 ? (
            <TableBody>
              {students.length !== 0 && (
                <TableRow>
                  <TableCell
                    colSpan={tableFields.length}
                    className="text-center text-gray-500"
                  >
                    No record Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              {filterStudentData.map((student, i) => {
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
                    <TableCell>{student.course_fee}</TableCell>
                    <TableCell>{student.deposited_fee}</TableCell>
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
                    <TableCell>
                      <GlobalTooltip content="Edit">
                        <Pencil className="w-4 cursor-pointer" />
                      </GlobalTooltip>
                      <GlobalTooltip content="Delete">
                        <Trash className="w-4 cursor-pointer" />
                      </GlobalTooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
      {students.length === 0 && (
        <Progress value={progress} className="w-[50%] m-auto my-6" />
      )}
    </motion.div>
  );
};

export default ViewAllStudent;
