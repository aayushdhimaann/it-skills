import React from "react";

const page = () => {
  return (
    <div>
      {/* Courses Section */}
      <section id="courses" className="py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center">
            Our Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-2xl font-semibold text-gray-800">
                  Python Programming
                </h4>
                <p className="mt-4 text-gray-600">
                  Start with the basics and go deep into data structures,
                  algorithms, and web development with Python.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-2xl font-semibold text-gray-800">
                  JavaScript Mastery
                </h4>
                <p className="mt-4 text-gray-600">
                  Learn JavaScript from scratch and become proficient in both
                  frontend and backend development.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-2xl font-semibold text-gray-800">
                  Full Stack Development
                </h4>
                <p className="mt-4 text-gray-600">
                  Become a full stack developer by mastering both frontend and
                  backend technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
