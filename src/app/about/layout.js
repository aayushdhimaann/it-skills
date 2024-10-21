import MainBar from "@/components/MainBar";
import NavBar from "@/components/UI/NavBar";

export default function AboutLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
