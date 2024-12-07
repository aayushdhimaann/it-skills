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
import {
  Pencil,
  Trash,
  User,
  UserCheck,
  UserCheck2,
  UserMinus2,
  UserRoundPen,
  UserX,
} from "lucide-react";
import GlobalTooltip from "@/components/ui/GlobalTooltip";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "next-themes";
const ViewAllStudent = () => {
  const { data: session, status } = useSession();
  const token = session?.user._accessToken;
  // state to manage the data of all the students
  const [students, setStudents] = useState([]);
  const [filterStudentData, setFilterStudentData] = useState(students);
  const [filterVal, setFilterVal] = useState("");
  const [progress, setProgress] = useState(10);
  const [active, setActive] = useState(2);
  //  0 = active
  // 1 = inactive
  //  2 = all

  // getting the theme
  const { theme } = useTheme();
  // table fields
  const tableFields = [
    "S. no",
    "Photo",
    "Student Name",
    "gender",
    "Father Name",
    "Email",
    "Phone Number",
    "Alternate Phone Number",
    "Address",
    "Branch",
    "Course Name",
    "Course Fee",
    "Deposited Fee",
    "Date of Birth",
    "Date of Admission",
    "status",
    "Action",
  ];
  const fetchAllStudent = async () => {
    try {
      const response = await axios.get("/api/student/view-all", {
        headers: {
          Authorization: `Bearer ${token}`,
          cache: "no-store",
        },
      });
      setStudents(response.data.studData);
      setFilterStudentData(response.data.studData);
    } catch (error) {
      //console.log("error : " + error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 500);
    if (status == "authenticated") {
      fetchAllStudent();
    }
    return () => clearTimeout(timer);
  }, [status]);

  // handle active students
  const handleActive = () => {
    const filtered = students.filter((student) => {
      return student.status === true;
    });
    setActive(0);
    setFilterStudentData(filtered);
  };

  // handle active students
  const handleInactive = () => {
    const filtered = students.filter((student) => {
      return student.status === false || student.status === undefined;
    });
    setActive(1);
    setFilterStudentData(filtered);
  };

  // handle All students
  const handleAll = () => {
    setActive(2);
    setFilterStudentData(students);
  };

  // use effect to fetch the filtered students
  useEffect(() => {
    let filtered = students.filter((student) =>
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

        <GlobalTooltip content="Active Students">
          <div
            className={` py-2 border-2 rounded-md  px-1 cursor-pointer hover:border-slate-50 ${
              active === 0 ? "border-slate-50" : "border-slate-500"
            }`}
            onClick={handleActive}
          >
            <UserCheck2
              className={`w-10 cursor-pointer   hover:text-slate-50 ${
                active === 0 ? "text-slate-50" : "text-slate-500"
              }`}
            />
          </div>
        </GlobalTooltip>

        <GlobalTooltip content="Inactive Students">
          <div
            className={` py-2 border-2 rounded-md  px-1 cursor-pointer hover:border-slate-50 ${
              active === 1 ? "border-slate-50" : "border-slate-500"
            }`}
            onClick={handleInactive}
          >
            <UserMinus2
              className={`w-10 cursor-pointer   hover:text-slate-50 ${
                active === 1 ? "text-slate-50" : "text-slate-500"
              }`}
            />
          </div>
        </GlobalTooltip>

        <GlobalTooltip content="All Students">
          <div
            className={` py-2 border-2 rounded-md  px-1 cursor-pointer hover:border-slate-50 ${
              active === 2 ? "border-slate-50" : "border-slate-500"
            }`}
            onClick={handleAll}
          >
            <User
              className={`w-10 cursor-pointer   hover:text-slate-50 ${
                active === 2 ? "text-slate-50" : "text-slate-500"
              }`}
            />
          </div>
        </GlobalTooltip>
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
                    className={`hover:bg-bgtheme2 group hover:text-bgtheme1  ${
                      theme === "dark"
                        ? student.status
                          ? "text-slate-300"
                          : "text-slate-600"
                        : student.status
                        ? "text-slate-900"
                        : "text-slate-400"
                    } `}
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
                    <TableCell>
                      {student.gender == "f" ? "female" : "male"}
                    </TableCell>
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
                      {student.status ? (
                        <GlobalTooltip content="active">
                          <UserCheck2 />
                        </GlobalTooltip>
                      ) : (
                        <GlobalTooltip content="inactive">
                          <UserMinus2 />
                        </GlobalTooltip>
                      )}
                    </TableCell>

                    <TableCell>
                      <GlobalTooltip content="Edit">
                        <Pencil className="w-4 cursor-pointer" />
                      </GlobalTooltip>
                      {/* <GlobalTooltip content="Change Status">
                        <UserRoundPen className="w-4 cursor-pointer" />
                      </GlobalTooltip> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
      {students.length === 0 && <Spinner size="medium" />}
    </motion.div>
  );
};

export default ViewAllStudent;
