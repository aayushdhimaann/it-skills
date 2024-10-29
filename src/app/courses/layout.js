import MainBar from "@/components/MainBar";
export const metadata = {
  title: "ITSKILLS - COURSES",
  description: "",
};
export default function CoursesLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
