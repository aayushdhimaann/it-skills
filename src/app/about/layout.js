import MainBar from "@/components/MainBar";
import NavBar from "@/components/ui/NavBar";

export default function AboutLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
