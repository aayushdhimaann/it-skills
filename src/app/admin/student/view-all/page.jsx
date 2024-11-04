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
const page = () => {
  const { data: session } = useSession();
  const token = session?.user._accessToken;
  // console.log(token);
  // state to manage the data of all the students
  const [allData, setAllData] = useState([]);

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
      console.log(response.data.studData);
      setAllData(response.data.studData);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  useEffect(() => {
    fetchAllStudent();
    console.log("object");
  }, []);
  return (
    <>
      {allData.length === 0 ? (
        <Loading />
      ) : (
        <div className="min-h-screen text-white py-2">
          <div className=" h-12 w-full flex justify-between items-center p-3">
            <h1>View All Students</h1>
            <Link href="/admin/student/add-new" className="hover:underline">
              Add New Student
            </Link>
          </div>

          <div className="mx-3  border-2 border-bgtheme1 rounded-lg">
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
                {allData.map((sInfo, i) => {
                  return (
                    <TableRow
                      key={sInfo._id}
                      className="hover:bg-bgtheme2 group hover:text-bgtheme1 text-slate-400"
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="group-hover:text-bgtheme1">
                        <Image
                          src={sInfo.photo}
                          alt="student image"
                          height={220}
                          width={100}
                        />
                      </TableCell>
                      <TableCell>{sInfo.student_name}</TableCell>
                      <TableCell>{sInfo.father_name}</TableCell>
                      <TableCell>{sInfo.email}</TableCell>
                      <TableCell>{sInfo.phone}</TableCell>
                      <TableCell>{sInfo.phone_alt}</TableCell>
                      <TableCell>{sInfo.address}</TableCell>
                      <TableCell>{sInfo.branch}</TableCell>
                      <TableCell>{sInfo.course_name}</TableCell>
                      <TableCell>
                        {new Date(sInfo.date_of_birth).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {new Date(sInfo.date_of_admission).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
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

export default page;
