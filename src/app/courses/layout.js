import NavBar from "@/components/UI/NavBar";

export default function CoursesLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
