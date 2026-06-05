"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  CheckCircle,
  XCircle,
  Download,
  Clock,
  Wallet,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { withdrawals, users } from "@/mock";

const statusConfig = {
  pending: { variant: "yellow", label: "Pending" },
  approved: { variant: "blue", label: "Approved" },
  completed: { variant: "green", label: "Completed" },
  rejected: { variant: "red", label: "Rejected" },
};

export default function AdminWithdrawals() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = withdrawals.filter((w) => {
    const u = users.find((u) => u.id === w.userId);
    const q = search.toLowerCase();
    const matchSearch =
      w.reference.toLowerCase().includes(q) ||
      u?.name.toLowerCase().includes(q) ||
      w.method.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPending = withdrawals
    .filter((w) => w.status === "pending")
    .reduce((s, w) => s + w.amount, 0);
  const totalApproved = withdrawals
    .filter((w) => w.status === "approved")
    .reduce((s, w) => s + w.amount, 0);
  const totalCompleted = withdrawals
    .filter((w) => w.status === "completed")
    .reduce((s, w) => s + w.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Withdrawal Management
          </h1>
          <p className="text-gray-500">
            Review and approve provider withdrawal requests
          </p>
        </div>
        <Button className="rounded-xl flex items-center gap-2">
          <Download size={16} /> Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pending Payout",
            value: `$${totalPending}`,
            icon: <Clock size={18} />,
            color: "yellow",
            note: `${withdrawals.filter((w) => w.status === "pending").length} requests`,
          },
          {
            label: "Approved",
            value: `$${totalApproved}`,
            icon: <CheckCircle size={18} />,
            color: "blue",
            note: "Processing",
          },
          {
            label: "Completed",
            value: `$${totalCompleted.toLocaleString()}`,
            icon: <DollarSign size={18} />,
            color: "green",
            note: "All time",
          },
          {
            label: "Rejected",
            value: withdrawals.filter((w) => w.status === "rejected").length,
            icon: <AlertCircle size={18} />,
            color: "red",
            note: "This month",
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
            <p className="text-xs text-gray-400 mt-1">{s.note}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm flex-1">
          <Search className="text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference, provider, or method..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl">
          {["all", "pending", "approved", "completed", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${statusFilter === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

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
                  "Reference",
                  "Provider",
                  "Amount",
                  "Method",
                  "Account",
                  "Status",
                  "Requested",
                  "Processed",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((w) => {
                const u = users.find((u) => u.id === w.userId);
                const cfg = statusConfig[w.status] || {
                  variant: "gray",
                  label: w.status,
                };
                return (
                  <motion.tr
                    key={w.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <code className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                        {w.reference}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u?.avatar && (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-8 h-8 rounded-xl object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {u?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">{u?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-base font-black text-gray-900">
                        ${w.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Wallet size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-gray-900">
                          {w.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-gray-600">
                        {w.accountName || w.accountNumber || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(w.requestedAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {w.processedAt ? (
                        new Date(w.processedAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {w.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl transition-colors">
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors">
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      )}
                      {w.status !== "pending" && (
                        <span className="text-xs text-gray-400">No action</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <p className="text-sm text-gray-500 font-medium">
            Showing {filtered.length} of {withdrawals.length} withdrawals
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl">
              ← Prev
            </button>
            <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl">
              1
            </button>
            <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl">
              Next →
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
