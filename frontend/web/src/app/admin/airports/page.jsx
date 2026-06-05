"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Globe,
  MapPin,
  Building2,
  Layers,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { airports, lounges } from "@/mock";

const extendedAirports = [
  ...airports,
  {
    id: "8",
    name: "Los Angeles International Airport",
    code: "LAX",
    city: "Los Angeles",
    country: "USA",
    terminals: [
      "Terminal 1",
      "Terminal 2",
      "Terminal 3",
      "Tom Bradley International",
    ],
  },
  {
    id: "9",
    name: "Tokyo Narita International Airport",
    code: "NRT",
    city: "Tokyo",
    country: "Japan",
    terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
  },
];

export default function AdminAirports() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("airports");

  const filteredAirports = extendedAirports.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.country.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredLounges = lounges.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.brand.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Airport Management
          </h1>
          <p className="text-gray-500">
            Manage airports, terminals, and lounge brands
          </p>
        </div>
        <Button className="rounded-xl flex items-center gap-2">
          <Plus size={14} /> Add Airport
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Airports",
            value: extendedAirports.length,
            icon: <Globe size={18} />,
            color: "blue",
          },
          {
            label: "Terminals",
            value: extendedAirports.reduce((s, a) => s + a.terminals.length, 0),
            icon: <Building2 size={18} />,
            color: "purple",
          },
          {
            label: "Lounge Brands",
            value: lounges.length,
            icon: <Layers size={18} />,
            color: "green",
          },
          {
            label: "Countries",
            value: [...new Set(extendedAirports.map((a) => a.country))].length,
            icon: <MapPin size={18} />,
            color: "amber",
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

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-gray-100 p-1.5 rounded-2xl shrink-0">
          {[
            { id: "airports", label: "Airports" },
            { id: "lounges", label: "Lounges" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${view === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm flex-1">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${view}...`}
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
      </div>

      {view === "airports" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAirports.map((airport) => (
            <motion.div
              key={airport.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center border border-blue-100">
                    <span className="font-black text-blue-700 text-sm">
                      {airport.code}
                    </span>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">
                      {airport.name.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} /> {airport.city}, {airport.country}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 size={13} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Terminals
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {airport.terminals.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {lounges.filter((l) => l.airportId === airport.id).length}{" "}
                  lounges listed
                </span>
                <button className="text-xs font-bold text-blue-600 hover:underline">
                  Manage →
                </button>
              </div>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-gray-400 hover:text-blue-600 min-h-[160px]"
          >
            <Plus size={24} />
            <span className="text-sm font-bold">Add New Airport</span>
          </motion.button>
        </div>
      )}

      {view === "lounges" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLounges.map((lounge) => {
            const airport = airports.find((a) => a.id === lounge.airportId);
            return (
              <motion.div
                key={lounge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Layers size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">
                        {lounge.name}
                      </p>
                      <p className="text-xs text-gray-500">{lounge.brand}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={12} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Globe size={11} className="text-gray-400" />
                    <span className="text-gray-600 font-medium">
                      {airport?.code} — {airport?.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={11} className="text-gray-400" />
                    <span className="text-gray-600 font-medium">
                      {lounge.terminal}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge variant="blue">{lounge.type}</Badge>
                </div>
              </motion.div>
            );
          })}
          <motion.button
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-gray-400 hover:text-blue-600 min-h-[160px]"
          >
            <Plus size={24} />
            <span className="text-sm font-bold">Add New Lounge</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
