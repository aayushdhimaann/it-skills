"use client";

import { IndianRupee, TrendingUp, User2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function Dashboard() {
  const [data, setData] = useState({ dashboard: [], students: [] });
  const { data: session, status } = useSession();
  const token = session?.user?._accessToken || "";

  // Sample chartData for demo (replace with actual dashboard data)
  const chartData = [
    { month: "January", student: 186 },
    { month: "February", student: 305 },
    { month: "March", student: 237 },
    { month: "April", student: 73 },
    { month: "May", student: 209 },
    { month: "June", student: 214 },
    { month: "August", student: 0 },
  ];

  const chartConfig = {
    student: {
      label: "Students",
      color: "hsl(var(--chart-1))",
    },
  };

  // Fetching dashboard data
  const fetchDashboard = async () => {
    try {
      const response = await axios.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setData((prevData) => ({
          ...prevData,
          dashboard: response.data.data || [],
        }));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      console.error("Status Code:", error.response?.status);
    }
  };

  // Fetching students with pending fees
  const fetchPendingFeeStudents = async () => {
    try {
      const response = await axios.get("/api/student/find-pending-fees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setData((prevData) => ({ ...prevData, students: response.data || [] }));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      console.error("Status Code:", error.response?.status);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboard();
      fetchPendingFeeStudents();
    }
  }, [status]);

  // Calculate trending percentage
  const calculateTrending = () => {
    const currentMonthIndex = new Date().getMonth();
    const previousMonthIndex = currentMonthIndex - 1;

    if (currentMonthIndex > 0 && data.dashboard.length > 0) {
      const currentMonthData = data.dashboard[currentMonthIndex];
      const previousMonthData = data.dashboard[previousMonthIndex];

      const currentStudents = currentMonthData?.Student || 0;
      const previousStudents = previousMonthData?.Student || 0;

      let percentageChange = 0;
      if (previousStudents > 0) {
        percentageChange =
          ((currentStudents - previousStudents) / previousStudents) * 100;
      } else if (currentStudents > 0) {
        percentageChange = 100;
      }

      return percentageChange;
    }
    return 0;
  };

  const trendingPercentage = calculateTrending();
  const trendDirection = trendingPercentage >= 0 ? "up" : "down";

  return (
    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          <span className="border-b-4">Dashboard</span>
        </h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border bg-card text-card-foreground shadow">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="tracking-tight text-sm font-medium">
                Total Students
              </div>
              <User2 className="w-4" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardTitle className="text-2xl font-bold">
                {data.dashboard.length > 0
                  ? data.dashboard.reduce(
                      (prev, curr) => prev + curr.Student,
                      0
                    )
                  : 0}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {trendDirection === "up" ? "+" : "-"}
                {Math.abs(trendingPercentage).toFixed(1)}% this month
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-xl border bg-card text-card-foreground shadow">
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="tracking-tight text-sm font-medium">
                Pending Fee Students
              </div>
              <IndianRupee className="w-4" />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardTitle className="text-2xl font-bold">
                {data.students.length}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Showing number of students whose fees are pending
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 mt-5">
          <Card>
            <CardHeader>
              <CardTitle>Student Chart</CardTitle>
              <CardDescription>
                {data.dashboard[0]?.monthName} - {data.dashboard[11]?.monthName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={data.dashboard}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="monthName"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="Student"
                    fill={chartConfig.student.color}
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending {trendDirection} by{" "}
                {Math.abs(trendingPercentage).toFixed(1)}% this month
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing students for the current year
              </div>
            </CardFooter>
          </Card>

          {/* Second Chart */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Bar Chart 2</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="student"
                    fill={chartConfig.student.color}
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
