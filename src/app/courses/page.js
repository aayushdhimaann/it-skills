'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [courses, setCourses] = useState([]);

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get("/api/course/get-all");
      setCourses(response.data.courses); // Assuming 'courses' is the array name in response
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div>
      {/* Courses Section */}
      <section id="courses" className="py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center">Our Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold text-gray-800">
                      {course.name}
                    </h4>
                    <p className="mt-4 text-gray-600">{course.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No courses available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
