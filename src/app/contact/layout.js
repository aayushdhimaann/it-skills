import MainBar from "@/components/MainBar";
import NavBar from "@/components/UI/NavBar";

export default function ContactLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
