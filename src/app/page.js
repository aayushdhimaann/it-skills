"use client";
import ThreeDModel from "@/components/3D/ThreeDModel";
import NavBar from "@/components/ui/NavBar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  // console.log(session);
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen z-10">
        {/* <ThreeDModel/> */}
        {/* Hero Section */}
        <section className="bg-gray-800 text-white py-20 min-h-screen flex items-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">
              Learn Coding. Build Your Future.
            </h2>
            <p className="mt-4 text-lg">
              Master coding languages like Python, JavaScript, C++, and more
              from top instructors.
            </p>
            <Link
              href="/courses"
              className="mt-6 inline-block bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100"
            >
              Explore Courses
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
