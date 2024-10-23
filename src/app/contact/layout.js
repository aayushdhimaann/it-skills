import MainBar from "@/components/MainBar";
import NavBar from "@/components/ui/NavBar";

export default function ContactLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
