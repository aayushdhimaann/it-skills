import NavBar from "@/components/UI/NavBar";

export default function SignInLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}