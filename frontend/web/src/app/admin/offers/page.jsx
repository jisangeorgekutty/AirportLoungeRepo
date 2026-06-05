"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  PauseCircle,
  Trash2,
  Star,
  Package,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { offers, users, airports } from "@/mock";

const extendedOffers = [
  ...offers,
  {
    id: "o7",
    providerId: "u3",
    airportId: "5",
    terminal: "Terminal 3",
    loungeName: "Air India Maharaja Lounge",
    price: 28,
    entries: 4,
    type: "Airline Membership",
    accessType: "domestic",
    availability: "All Day",
    rating: 4.2,
    status: "pending",
    cardType: "Air India SBI Card",
    description: "Classic Air India hospitality with regional cuisine.",
  },
  {
    id: "o8",
    providerId: "u5",
    airportId: "1",
    terminal: "Terminal 7",
    loungeName: "JetBlue Mint Lounge",
    price: 55,
    entries: 2,
    type: "Credit Card",
    accessType: "domestic",
    availability: "09:00 AM – 09:00 PM",
    rating: 4.5,
    status: "paused",
    cardType: "JetBlue Plus Card",
    description: "Premium JetBlue experience with lie-flat suites.",
  },
];

const statusConfig = {
  active: { variant: "green", label: "Active" },
  pending: { variant: "yellow", label: "Pending Review" },
  paused: { variant: "gray", label: "Paused" },
  rejected: { variant: "red", label: "Rejected" },
  expired: { variant: "red", label: "Expired" },
};

export default function AdminOffers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = extendedOffers.filter((o) => {
    const provider = users.find((u) => u.id === o.providerId);
    const airport = airports.find((a) => a.id === o.airportId);
    const q = search.toLowerCase();
    const matchSearch =
      o.loungeName.toLowerCase().includes(q) ||
      provider?.name.toLowerCase().includes(q) ||
      (airport?.code || "").toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: extendedOffers.length,
    active: extendedOffers.filter((o) => o.status === "active").length,
    pending: extendedOffers.filter((o) => o.status === "pending").length,
    paused: extendedOffers.filter((o) => o.status === "paused").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Offer Management
          </h1>
          <p className="text-gray-500">
            Review, approve, and moderate lounge access offers
          </p>
        </div>
        <Button className="rounded-xl">Export CSV</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Offers",
            value: extendedOffers.length,
            color: "blue",
          },
          { label: "Active", value: counts.active, color: "green" },
          { label: "Pending Review", value: counts.pending, color: "yellow" },
          { label: "Paused", value: counts.paused, color: "gray" },
        ].map((s) => (
          <Card
            key={s.label}
            className="p-5 border-none shadow-md"
            hoverable={false}
          >
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl overflow-x-auto shrink-0">
          {Object.entries(counts).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap capitalize ${statusFilter === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {key}{" "}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${statusFilter === key ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm flex-1">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by lounge, provider, or airport..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
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
                  "Lounge",
                  "Provider",
                  "Airport",
                  "Type",
                  "Price",
                  "Entries",
                  "Rating",
                  "Status",
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
              {filtered.map((o) => {
                const provider = users.find((u) => u.id === o.providerId);
                const airport = airports.find((a) => a.id === o.airportId);
                const cfg = statusConfig[o.status] || {
                  variant: "gray",
                  label: o.status,
                };
                return (
                  <motion.tr
                    key={o.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Package size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {o.loungeName}
                          </p>
                          <p className="text-xs text-gray-500">{o.terminal}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {provider?.avatar && (
                          <img
                            src={provider.avatar}
                            alt=""
                            className="w-7 h-7 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="text-xs font-bold text-gray-900">
                            {provider?.name}
                          </p>
                          {provider?.verified && (
                            <p className="text-[10px] text-blue-600 font-bold">
                              ✓ Verified
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-gray-900">
                        {airport?.code}
                      </p>
                      <p className="text-xs text-gray-500">{airport?.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="blue">{o.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-gray-900">
                        ${o.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900">
                        {o.entries}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                        <Star size={12} fill="#f59e0b" /> {o.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={13} />
                        </button>
                        {o.status === "pending" && (
                          <>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <CheckCircle size={13} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <XCircle size={13} />
                            </button>
                          </>
                        )}
                        {o.status === "active" && (
                          <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                            <PauseCircle size={13} />
                          </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={13} />
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
            Showing {filtered.length} of {extendedOffers.length} offers
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
