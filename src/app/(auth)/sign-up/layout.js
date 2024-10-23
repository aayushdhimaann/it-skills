import MainBar from "@/components/MainBar";
import NavBar from "@/components/ui/NavBar";

export default function SignUpLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
