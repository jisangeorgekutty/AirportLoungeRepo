"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  Flag,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { requests, users, airports } from "@/mock";

const extendedRequests = [
  ...requests,
  {
    id: "r5",
    seekerId: "u6",
    airportId: "7",
    terminal: "Terminal 1",
    passengerCount: 2,
    flightNumber: "CX123",
    airline: "Cathay Pacific",
    status: "pending",
    createdAt: "2026-06-02T11:00:00Z",
    loungeType: "international",
    preferredTime: "01:00 PM",
    budget: 90,
  },
  {
    id: "r6",
    seekerId: "u2",
    airportId: "6",
    terminal: "Terminal 2",
    passengerCount: 1,
    flightNumber: "LH400",
    airline: "Lufthansa",
    status: "completed",
    createdAt: "2026-05-25T06:00:00Z",
    loungeType: "international",
    preferredTime: "06:00 AM",
    budget: 70,
  },
];

const statusConfig = {
  pending: { variant: "yellow", icon: <Clock size={12} /> },
  approved: { variant: "blue", icon: <CheckCircle size={12} /> },
  completed: { variant: "green", icon: <CheckCircle size={12} /> },
  rejected: { variant: "red", icon: <XCircle size={12} /> },
  cancelled: { variant: "gray", icon: <XCircle size={12} /> },
};

export default function AdminRequests() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = extendedRequests.filter((r) => {
    const u = users.find((u) => u.id === r.seekerId);
    const a = airports.find((a) => a.id === r.airportId);
    const q = search.toLowerCase();
    const matchSearch =
      r.flightNumber.toLowerCase().includes(q) ||
      u?.name.toLowerCase().includes(q) ||
      a?.code.toLowerCase().includes(q);
    const matchTab = tab === "all" || r.status === tab;
    return matchSearch && matchTab;
  });

  const counts = {
    all: extendedRequests.length,
    pending: extendedRequests.filter((r) => r.status === "pending").length,
    approved: extendedRequests.filter((r) => r.status === "approved").length,
    completed: extendedRequests.filter((r) => r.status === "completed").length,
    rejected: extendedRequests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Request Management
          </h1>
          <p className="text-gray-500">
            Review and manage all lounge access requests
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="rounded-xl border-gray-200">
            Export
          </Button>
          <Button className="rounded-xl">Bulk Action</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl overflow-x-auto">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap capitalize ${tab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {key}{" "}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-black ${tab === key ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
        <Search className="text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by flight number, seeker, or airport..."
          className="bg-transparent border-none outline-none text-sm ml-3 w-full"
        />
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
                  "Request ID",
                  "Seeker",
                  "Flight",
                  "Airport",
                  "Passengers",
                  "Budget",
                  "Status",
                  "Date",
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
              {filtered.map((r) => {
                const seeker = users.find((u) => u.id === r.seekerId);
                const airport = airports.find((a) => a.id === r.airportId);
                const cfg = statusConfig[r.status] || statusConfig.pending;
                return (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <code className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {r.id.toUpperCase()}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {seeker?.avatar && (
                          <img
                            src={seeker.avatar}
                            alt={seeker.name}
                            className="w-8 h-8 rounded-xl object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {seeker?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {seeker?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-gray-900">
                        {r.flightNumber}
                      </p>
                      <p className="text-xs text-gray-500">{r.airline}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">
                        {airport?.code}
                      </p>
                      <p className="text-xs text-gray-500">{r.terminal}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-gray-900">
                        {r.passengerCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">
                        ${r.budget}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={cfg.variant}
                        className="flex items-center gap-1 w-fit capitalize"
                      >
                        {cfg.icon} {r.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                          <Eye size={14} />
                        </button>
                        {r.status === "pending" && (
                          <>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                              <CheckCircle size={14} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                          <Flag size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <p className="text-sm text-gray-500 font-medium">
            Showing {filtered.length} of {extendedRequests.length} requests
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
