import MainBar from "@/components/MainBar";
export const metadata = {
  title: "ITSKILLS - SIGN UP",
  description: "",
};
export default function SignUpLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
