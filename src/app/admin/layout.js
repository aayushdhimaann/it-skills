import AdminNavBar from "@/components/UI/Admin/NavBar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavBar />
      {children}
    </>
  );
}
