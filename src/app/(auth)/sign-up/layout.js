import MainBar from "@/components/MainBar";
import NavBar from "@/components/UI/NavBar";

export default function SignUpLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
