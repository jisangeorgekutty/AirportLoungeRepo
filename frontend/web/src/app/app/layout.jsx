import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Clock,
  Wallet,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  MessageCircle,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";

const Sidebar = () => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const navigate = useNavigate();
  const { logout } = useStore();
  const navItems = [
    {
      label: "Overview",
      icon: <LayoutDashboard size={20} />,
      path: "/app/dashboard",
    },
    {
      label: "Marketplace",
      icon: <ShoppingBag size={20} />,
      path: "/app/marketplace",
    },
    {
      label: "Create Offer",
      icon: <PlusCircle size={20} />,
      path: "/app/offer",
    },
    { label: "My Requests", icon: <Clock size={20} />, path: "/app/requests" },
    { label: "QR Access", icon: <QrCode size={20} />, path: "/app/access" },
    { label: "Messages", icon: <MessageCircle size={20} />, path: "/app/chat" },
    { label: "Wallet", icon: <Wallet size={20} />, path: "/app/wallet" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen sticky top-0 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Clock className="text-white w-6 h-6 rotate-45" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">
          LoungeLink
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const active = currentPath.startsWith(item.path);
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              <div
                className={
                  active
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }
              >
                {item.icon}
              </div>
              <span className="font-semibold text-sm">{item.label}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="pt-10 border-t border-gray-100 space-y-2">
        <a
          href="/app/profile"
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all font-semibold text-sm"
        >
          <User size={20} /> Profile
        </a>
        <a
          href="/app/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all font-semibold text-sm"
        >
          <Settings size={20} /> Settings
        </a>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm cursor-pointer"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, notifications } = useStore();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/app/login" ||
    location.pathname === "/app/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 w-96 group focus-within:ring-2 ring-blue-500/10 ring-offset-0 transition-all">
            <Search
              className="text-gray-400 group-focus-within:text-blue-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search airports, lounges or offers..."
              className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
                <Bell size={22} />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
                )}
              </button>
            </div>

            <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />

            <a
              href="/app/profile"
              className="flex items-center gap-3 pl-2 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 capitalize">
                  {user?.role}
                </p>
              </div>
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-blue-100 transition-all"
              />
            </a>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-[70] lg:hidden p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="text-white w-6 h-6 rotate-45" />
                  </div>
                  <span className="text-xl font-bold">LoungeLink</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
