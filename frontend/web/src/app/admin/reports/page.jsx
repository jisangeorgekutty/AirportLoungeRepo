"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  BarChart2,
  TrendingUp,
  Users,
  Globe,
  FileText,
  Table,
  FileSpreadsheet,
} from "lucide-react";
import { Card, Button, Badge } from "@/components/ui";
import { analytics } from "@/mock";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("6m");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Reports Center
          </h1>
          <p className="text-gray-500">
            Generate, analyze, and export platform analytics
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {["1m", "3m", "6m", "1y"].map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dateRange === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <Button className="rounded-xl flex items-center gap-2">
            <Download size={14} /> Export All
          </Button>
        </div>
      </div>

      {/* Export Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Revenue Report",
            icon: <TrendingUp size={18} />,
            color: "blue",
          },
          { label: "User Report", icon: <Users size={18} />, color: "purple" },
          {
            label: "Transaction Log",
            icon: <BarChart2 size={18} />,
            color: "green",
          },
          {
            label: "Withdrawal Summary",
            icon: <Table size={18} />,
            color: "yellow",
          },
          {
            label: "Airport Analytics",
            icon: <Globe size={18} />,
            color: "pink",
          },
          {
            label: "Provider Report",
            icon: <FileText size={18} />,
            color: "orange",
          },
        ].map((r) => (
          <motion.div
            whileHover={{ y: -3 }}
            key={r.label}
            className="bg-white border border-gray-100 rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg transition-all shadow-sm"
          >
            <div
              className={`w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600`}
            >
              {r.icon}
            </div>
            <p className="text-xs font-bold text-gray-700 leading-tight mb-3">
              {r.label}
            </p>
            <div className="flex gap-1 justify-center">
              {[
                { icon: <FileText size={10} />, label: "PDF" },
                { icon: <FileSpreadsheet size={10} />, label: "CSV" },
              ].map((e) => (
                <button
                  key={e.label}
                  className="flex items-center gap-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {e.icon} {e.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Platform Revenue */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-gray-900">Platform Revenue</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Gross + platform fee over time
              </p>
            </div>
            <Badge variant="green">↑ 22.4%</Badge>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.platformRevenue}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="feeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v, n) => [
                    `$${v.toLocaleString()}`,
                    n === "revenue" ? "Gross Revenue" : "Platform Fees",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    fontWeight: 700,
                  }}
                />
                <Legend
                  formatter={(v) =>
                    v === "revenue" ? "Gross Revenue" : "Platform Fees"
                  }
                  wrapperStyle={{ fontSize: "12px", fontWeight: 700 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#revGrad)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="fees"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#feeGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Growth */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-gray-900">User Growth</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Seekers vs Providers over time
              </p>
            </div>
            <Badge variant="blue">↑ 18.9%</Badge>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.userGrowth}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    fontWeight: 700,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", fontWeight: 700 }} />
                <Bar
                  dataKey="seekers"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Seekers"
                />
                <Bar
                  dataKey="providers"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Providers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue by Airport */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-none shadow-lg h-full" hoverable={false}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-black text-gray-900">Revenue by Airport</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Top performing airports
                </p>
              </div>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.revenueByAirport}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f3f4f6"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="airport"
                    tick={{ fontSize: 12, fontWeight: 700, fill: "#374151" }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                      fontWeight: 700,
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Request Status Pie */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="mb-6">
            <h3 className="font-black text-gray-900">Request Status</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Distribution this period
            </p>
          </div>
          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.requestStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {analytics.requestStatus.map((entry, index) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, n) => [v, n]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    fontWeight: 700,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {analytics.requestStatus.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs font-medium text-gray-600">
                    {s.name}
                  </span>
                </div>
                <span className="text-xs font-black text-gray-900">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
