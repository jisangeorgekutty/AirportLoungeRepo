"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  ShieldAlert,
  UserCheck,
  UserX,
  Eye,
  Users,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { users } from "@/mock";

const allUsers = [
  ...users,
  {
    id: "u7",
    name: "Oliver Wright",
    email: "oliver@example.com",
    role: "provider",
    rating: 4.3,
    reviews: 31,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    verified: false,
    kyc: "pending",
    joinDate: "2024-06-01",
    totalEarnings: 1200,
    transactions: 9,
  },
  {
    id: "u8",
    name: "Nina Patel",
    email: "nina@example.com",
    role: "seeker",
    rating: 4.9,
    reviews: 55,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    verified: true,
    kyc: "verified",
    joinDate: "2024-04-10",
    totalEarnings: 0,
    transactions: 34,
  },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = allUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.kyc === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-gray-500">Monitor and manage platform users</p>
        </div>
        <Button className="rounded-xl">Export CSV</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Users",
            value: allUsers.length,
            icon: <Users size={18} />,
            color: "blue",
          },
          {
            label: "Verified",
            value: allUsers.filter((u) => u.verified).length,
            icon: <CheckCircle size={18} />,
            color: "green",
          },
          {
            label: "Pending KYC",
            value: allUsers.filter((u) => u.kyc === "pending").length,
            icon: <Clock size={18} />,
            color: "yellow",
          },
          {
            label: "Suspended",
            value: 0,
            icon: <XCircle size={18} />,
            color: "red",
          },
        ].map((s) => (
          <Card
            key={s.label}
            className="p-5 border-none shadow-md"
            hoverable={false}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-${s.color}-600 bg-${s.color}-50`}
            >
              {s.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 border-none shadow-md" hoverable={false}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 flex-1">
            <Search className="text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="provider">Providers</option>
            <option value="seeker">Seekers</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card
        className="p-0 overflow-hidden border-none shadow-lg"
        hoverable={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {[
                  "User",
                  "Role",
                  "KYC Status",
                  "Rating",
                  "Transactions",
                  "Earnings",
                  "Joined",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                          {u.name}
                          {u.verified && (
                            <CheckCircle size={12} className="text-blue-500" />
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={u.role === "provider" ? "blue" : "purple"}
                      className="capitalize"
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={u.kyc === "verified" ? "green" : "yellow"}
                      className="capitalize"
                    >
                      {u.kyc}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">
                      ⭐ {u.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">
                      {u.transactions}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">
                      ${u.totalEarnings.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-500">
                      {new Date(u.joinDate).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === u.id ? null : u.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                      {openMenu === u.id && (
                        <div className="absolute right-0 top-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 w-48 space-y-1">
                          {[
                            {
                              icon: <Eye size={14} />,
                              label: "View Profile",
                              color: "gray",
                            },
                            {
                              icon: <UserCheck size={14} />,
                              label: "Verify User",
                              color: "green",
                            },
                            {
                              icon: <Shield size={14} />,
                              label: "KYC Review",
                              color: "blue",
                            },
                            {
                              icon: <ShieldAlert size={14} />,
                              label: "Suspend",
                              color: "yellow",
                            },
                            {
                              icon: <UserX size={14} />,
                              label: "Ban User",
                              color: "red",
                            },
                          ].map((action) => (
                            <button
                              key={action.label}
                              onClick={() => setOpenMenu(null)}
                              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-${action.color}-50 text-${action.color === "gray" ? "gray-700" : action.color + "-700"}`}
                            >
                              {action.icon} {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <p className="text-sm text-gray-500 font-medium">
            Showing {filtered.length} of {allUsers.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
              ← Prev
            </button>
            <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl">
              1
            </button>
            <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
              Next →
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
