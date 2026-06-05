import React from "react";
import {
  Users,
  LayoutGrid,
  FileText,
  AlertCircle,
  ShieldAlert,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Globe,
  DollarSign,
  Clock,
  Wallet,
  Package,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import { useNavigate, useLocation, Link } from "react-router";

const AdminSidebar = () => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const navigate = useNavigate();
  const navItems = [
    {
      label: "Overview",
      icon: <LayoutGrid size={20} />,
      path: "/admin/dashboard",
    },
    { label: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { label: "Requests", icon: <Clock size={20} />, path: "/admin/requests" },
    { label: "Offers", icon: <Package size={20} />, path: "/admin/offers" },
    {
      label: "Transactions",
      icon: <DollarSign size={20} />,
      path: "/admin/transactions",
    },
    {
      label: "Withdrawals",
      icon: <Wallet size={20} />,
      path: "/admin/withdrawals",
    },
    { label: "Reports", icon: <BarChart3 size={20} />, path: "/admin/reports" },
    { label: "CMS", icon: <FileText size={20} />, path: "/admin/cms" },
    {
      label: "Airports",
      icon: <Building2 size={20} />,
      path: "/admin/airports",
    },
  ];

  return (
    <aside className="w-72 bg-gray-900 h-screen sticky top-0 hidden lg:flex flex-col p-6 text-white">
      <div className="flex items-center gap-3 mb-12 pl-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Globe className="text-white w-6 h-6 animate-pulse" />
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic">
          LoungeLink <span className="text-blue-500 font-black">HQ</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = currentPath.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white font-medium"}`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-1">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all font-medium text-sm"
        >
          <Settings size={20} /> Settings
        </Link>
        <button
          onClick={() => navigate("/admin/login")}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm cursor-pointer"
        >
          <LogOut size={20} /> Exit HQ
        </button>
      </div>
    </aside>
  );
};

export default function AdminLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Badge
              variant="blue"
              className="bg-blue-50 text-blue-600 font-black border-none uppercase tracking-widest text-[10px]"
            >
              Production Mode
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <MessageSquare size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-black text-gray-900">
                  Admin Terminal
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-blue-50 flex items-center justify-center font-black text-white text-xs">
                AD
              </div>
            </div>
          </div>
        </header>
        <div className="p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
