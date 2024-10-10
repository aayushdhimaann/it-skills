import NavBar from "@/components/UI/NavBar";

export default function AboutLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
