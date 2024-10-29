import MainBar from "@/components/MainBar";
export const metadata = {
  title: "ITSKILLS - CONTACT",
  description: "",
};
export default function ContactLayout({ children }) {
  return (
    <>
      <MainBar />
      {children}
    </>
  );
}
