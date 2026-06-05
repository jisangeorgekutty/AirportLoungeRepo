"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Download,
  DollarSign,
  TrendingUp,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { transactions, users } from "@/mock";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const volumeData = [
  { day: "Mon", volume: 1200 },
  { day: "Tue", volume: 1900 },
  { day: "Wed", volume: 1400 },
  { day: "Thu", volume: 2200 },
  { day: "Fri", volume: 3100 },
  { day: "Sat", volume: 2800 },
  { day: "Sun", volume: 1600 },
];

const typeConfig = {
  booking: { variant: "blue", label: "Booking" },
  withdrawal: { variant: "purple", label: "Withdrawal" },
  refund: { variant: "yellow", label: "Refund" },
};
const statusConfig = {
  completed: { variant: "green" },
  pending: { variant: "yellow" },
  failed: { variant: "red" },
};

export default function AdminTransactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = transactions.filter((t) => {
    const u = users.find((u) => u.id === t.userId);
    const q = search.toLowerCase();
    const matchSearch =
      t.reference.toLowerCase().includes(q) ||
      u?.name.toLowerCase().includes(q) ||
      (t.airport || "").toLowerCase().includes(q);
    const matchType = typeFilter === "all" || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalVolume = transactions.reduce((s, t) => s + t.amount, 0);
  const totalFees = transactions.reduce((s, t) => s + t.platformFee, 0);
  const pending = transactions.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-gray-500">
            Full transaction monitoring and platform fee tracking
          </p>
        </div>
        <Button className="rounded-xl flex items-center gap-2">
          <Download size={16} /> Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Volume",
            value: `$${totalVolume.toFixed(2)}`,
            icon: <DollarSign size={18} />,
            color: "blue",
          },
          {
            label: "Platform Fees",
            value: `$${totalFees.toFixed(2)}`,
            icon: <TrendingUp size={18} />,
            color: "green",
          },
          {
            label: "Pending",
            value: pending,
            icon: <RefreshCw size={18} />,
            color: "yellow",
          },
          {
            label: "Disputes",
            value: "1",
            icon: <AlertCircle size={18} />,
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

      {/* Volume Chart */}
      <Card className="p-6 border-none shadow-lg" hoverable={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-black text-gray-900">
              Weekly Transaction Volume
            </h3>
            <p className="text-sm text-gray-500">
              Total value processed per day
            </p>
          </div>
          <Badge variant="green">↑ 14.2% this week</Badge>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={volumeData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="txnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fontWeight: 600, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fontWeight: 600, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(v) => [`$${v}`, "Volume"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  fontWeight: 700,
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#txnGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#3b82f6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filters & Table */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm flex-1">
          <Search className="text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference, user, or airport..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none shadow-sm"
        >
          <option value="all">All Types</option>
          <option value="booking">Bookings</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="refund">Refunds</option>
        </select>
      </div>

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
                  "User",
                  "Type",
                  "Amount",
                  "Platform Fee",
                  "Provider Payout",
                  "Airport/Lounge",
                  "Status",
                  "Date",
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
              {filtered.map((t) => {
                const u = users.find((u) => u.id === t.userId);
                const tcfg = typeConfig[t.type] || {
                  variant: "gray",
                  label: t.type,
                };
                const scfg = statusConfig[t.status] || { variant: "gray" };
                return (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <code className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {t.reference}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {u?.avatar && (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-7 h-7 rounded-lg object-cover"
                          />
                        )}
                        <p className="text-sm font-bold text-gray-900">
                          {u?.name || "Unknown"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={tcfg.variant}>{tcfg.label}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-900">
                        ${t.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-green-700">
                        ${t.platformFee.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-700">
                        ${t.providerAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {t.airport ? (
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {t.airport}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {t.lounge}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={scfg.variant} className="capitalize">
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <p className="text-sm text-gray-500 font-medium">
            Showing {filtered.length} of {transactions.length} transactions
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
