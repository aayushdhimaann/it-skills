import MainBar from "@/components/MainBar";

export default function CoursesLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
