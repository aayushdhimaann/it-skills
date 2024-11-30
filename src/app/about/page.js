"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HomeIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
const Page = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("/api/about/get-all", {
      headers: {
        cache: "no-store",
      },
    });
    setData(response.data.aboutUsData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* About Us Section */}
      <section id="about" className="py-20 min-h-7 bg-grey-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center hover:underline">
            Welcome to IT Skills
          </h3>
          <p className="mt-4 text-center text-lg">
            Experience without knowledge is ignorance. We at IT Skills
            understand that and will give you a perfect combination of knowledge
            and experience at our training programmes.
          </p>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-10 bg-grey-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-white-100">
          <div className="flex justify-between">
            <Card className="w-[400px] m-3 hover:bg-white hover:text-black">
              <CardHeader>
                <Image
                  src="/asset/training.png"
                  alt="Training Image"
                  width={100}
                  height={15}
                  className="min-w-10 rounded-lg mt-4 mx-auto border-2"
                />
                <CardTitle className="text-3xl font-bold text-center mt-4">
                  Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We provide training courses in our Institute for people with
                  beginner, intermediate, and expert level proficiency in
                  various technologies, with tenure varying in Noida.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="w-[400px] m-3 hover:bg-white hover:text-black">
              <CardHeader>
                <Image
                  src="/asset/development.png"
                  alt="Development Image"
                  width={110}
                  height={10}
                  className="min-w-6 rounded-lg mt-4 mx-auto"
                />
                <CardTitle className="text-3xl font-bold text-center mt-4">
                  Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  IT Skills is an excellent software development company in
                  Delhi NCR, India. We thoroughly comprehend the objective of
                  software development for each of our clients.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="w-[400px] m-3 hover:bg-white hover:text-black">
              <CardHeader>
                <Image
                  src="/asset/consultancy.jpeg"
                  alt="Consultancy Image"
                  width={100}
                  height={5}
                  className="rounded-lg mt-4 mx-auto"
                />
                <CardTitle className="text-3xl font-bold text-center mt-4">
                  Consultancy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We have a dedicated team for placements. The placement cell
                  works for all placement-related activities; taking care of
                  placement inductions, mock GD PI sessions, etc.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section id="itskills" className="bg-red p-6 mb-6 rounded-lg shadow-md">
        <div className="flex justify-between">
          <Card className="w-[400px] p-3 rounded-lg shadow-sm shadow-blue-100 mx-2 bg-grey hover:bg-white hover:text-black transition duration-300 ease-in-out">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                IT SKILLS
              </CardTitle>
              <hr className="border-t-2 border-grey w-40 mx-auto mb-4" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Make your summer a life-changing experience at open door for
                numerous opportunities at IT skills.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="w-[400px] p-3 rounded-lg shadow-sm shadow-blue-100 mx-2 bg-grey hover:bg-white hover:text-black transition duration-300 ease-in-out">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                USEFUL LINKS
              </CardTitle>
              <hr className="border-t-2 border-reds-100 w-40 mx-auto mb-4" />
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-2">
              <Link
                href="#home"
                className="text-lg text-whites-600 hover:underline hover:text-black transition duration-300 ease-in-out"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-lg text-whit-600 hover:underline hover:text-black transition duration-300 ease-in-out"
              >
                About Us
              </Link>
              <Link
                href="#courses"
                className="text-lg text-white-600 hover:underline hover:text-black transition duration-300 ease-in-out"
              >
                Courses
              </Link>
              <Link
                href="#services"
                className="text-lg text-white-600 hover:underline hover:text-black transition duration-300 ease-in-out"
              >
                Services
              </Link>
            </CardContent>
          </Card>
          <Card className="w-[400px] p-3 rounded-lg shadow-sm shadow-blue-100 mx-2 bg-grey hover:bg-white hover:text-black transition duration-300 ease-in-out">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">CONTACT</CardTitle>
              <hr className="border-t-2 border-reds-100 w-40 mx-auto mb-4" />
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-12 w-10 text-white" />
                <span>{data[0]?.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-6 w-6 text-white text-left" />
                <span>{data[0]?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-6 w-6 text-white" />
                <span>{data[0]?.phno}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Page;
