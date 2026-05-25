import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout ( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <Sidebar />

        <div className="min-h-screen pb-24 lg:ml-72 lg:pb-0">
          <Topbar />

          <div className="px-4 py-6 sm:px-6 lg:px-8">{ children }</div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
