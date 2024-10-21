"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mapping categories to their corresponding icons (you can replace with actual icon components)
const categoryIcons = {
  "Category A": "🔍", // Replace with an icon component if needed
  "Category B": "📚",
  "Category C": "⚙️",
  "Category D": "🎨",
};

const categoryData = {
  "Category A": ["Item A1", "Item A2", "Item A3"],
  "Category B": ["Item B1", "Item B2", "Item B3"],
  "Category C": ["Item C1", "Item C2", "Item C3"],
  "Category D": ["Item D1", "Item D2", "Item D3"],
};

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = Object.keys(categoryData);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <div className="container mx-auto p-4">
        <Select
          className="bg-gray-800 text-white"
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px] bg-gray-700 border border-gray-600 text-white">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border border-gray-600">
            {/* Clear Selection Option */}
            <SelectItem value="clear" className="text-white hover:bg-gray-700">
              Select a Category
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="text-white hover:bg-gray-700 flex items-center"
              >
                <span className="mr-2">{categoryIcons[category]}</span>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Show items only if a category is selected */}
        {selectedCategory && selectedCategory !== "clear" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {categoryData[selectedCategory].map((item, index) => (
              <Card key={index} className="bg-gray-800 text-white shadow-lg">
                <CardContent className="flex items-start p-4">
                  <span className="text-2xl mr-4">
                    {categoryIcons[selectedCategory]}
                  </span>
                  <div className="flex-1">
                    <p className="text-lg font-medium">{item}</p>
                    <p className="text-sm text-gray-400">
                      Send notifications to device.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Clear the selection if "Clear Selection" is chosen */}
        {selectedCategory === "clear" && setSelectedCategory("")}
      </div>
    </div>
  );
};

export default Page;
