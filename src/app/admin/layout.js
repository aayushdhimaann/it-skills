import AdminNavBar from "@/components/ui/Admin/NavBar";
export const metadata = {
  title: "ITSKILLS - ADMIN DASHBOARD",
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
