import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout ( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Sidebar />

      <div className="lg:pl-72">
        <Topbar />

        <main className="p-4 sm:p-6 lg:p-8">
          { children }
        </main>
      </div>
    </div>
  );
}