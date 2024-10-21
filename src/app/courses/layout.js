import MainBar from "@/components/MainBar";
import NavBar from "@/components/UI/NavBar";

export default function CoursesLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
