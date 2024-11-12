import AdminNavBar from "@/components/ui/Admin/NavBar";
export const metadata = {
  title: "ITSKILLS - ADMIN",
  description: "",
};
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavBar />
      {children}
    </>
  );
}
