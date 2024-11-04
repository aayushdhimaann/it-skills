import NavBar from "@/components/ui/NavBar";
export const metadata = {
  title: "ITSKILLS - LOGIN",
  description: "",
};
export default function SignInLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
