import {
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { logout } from "../../store/Auth/authSlice";
import type { RootState } from "../../store/store";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Services", path: "/admin/services", icon: Wrench },
  { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
  { name: "Posts", path: "/admin/posts", icon: FileText },
  { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
];

const AdminLayout = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen bg-[#071425] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1e33] border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="block">
            <h2 className="text-xl font-barlow font-bold uppercase tracking-wider text-[#f0c03e]">
              AAAAAffordable
            </h2>
            <p className="text-xs text-offYellow tracking-widest uppercase mt-1">
              Admin Panel
            </p>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#f0c03e] text-[#071425] font-semibold shadow-md"
                    : "text-offYellow hover:bg-[#071425] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-offYellow hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar (Mobile mainly, but good for structure) */}
        <header className="h-16 bg-[#0d1e33] border-b border-border flex items-center justify-between px-6 lg:hidden">
          <h2 className="text-lg font-barlow font-bold uppercase text-[#f0c03e]">
            Admin Panel
          </h2>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
