import NavBar from "@/components/ui/NavBar";

export default function SignInLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
