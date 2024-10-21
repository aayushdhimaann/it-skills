import AdminNavBar from "@/components/ui/Admin/NavBar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavBar />
      {children}
    </>
  );
}
