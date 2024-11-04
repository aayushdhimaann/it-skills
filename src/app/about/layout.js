import MainBar from "@/components/MainBar";
export const metadata = {
  title: "ITSKILLS  - ABOUT",
  description: "",
};
export default function AboutLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
