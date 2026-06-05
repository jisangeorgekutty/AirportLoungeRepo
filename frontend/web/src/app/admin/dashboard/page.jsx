"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Card, Badge, Button } from "@/components/ui";
import { analytics, transactions, users, airports } from "@/mock";
import {
  DollarSign,
  Users,
  BarChart3,
  ShieldAlert,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  Globe,
  Zap,
  RefreshCw,
} from "lucide-react";
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

const statCards = [
  {
    label: "Total Revenue",
    value: "$128,430",
    trend: "+12.5%",
    sub: "vs last month",
    color: "blue",
    icon: <DollarSign size={20} />,
    bg: "from-blue-500 to-blue-600",
  },
  {
    label: "Active Seekers",
    value: "12,450",
    trend: "+8.2%",
    sub: "registered users",
    color: "purple",
    icon: <Users size={20} />,
    bg: "from-purple-500 to-purple-600",
  },
  {
    label: "Platform Fees",
    value: "$6,421",
    trend: "+15.1%",
    sub: "this month",
    color: "green",
    icon: <TrendingUp size={20} />,
    bg: "from-green-500 to-green-600",
  },
  {
    label: "Open Requests",
    value: "284",
    trend: "+4.3%",
    sub: "awaiting match",
    color: "amber",
    icon: <Clock size={20} />,
    bg: "from-amber-500 to-orange-500",
  },
  {
    label: "Completed Txns",
    value: "1,892",
    trend: "+22.1%",
    sub: "this month",
    color: "teal",
    icon: <CheckCircle size={20} />,
    bg: "from-teal-500 to-cyan-500",
  },
  {
    label: "Active Providers",
    value: "3,210",
    trend: "+6.8%",
    sub: "verified accounts",
    color: "pink",
    icon: <Activity size={20} />,
    bg: "from-pink-500 to-rose-500",
  },
  {
    label: "Withdrawals Pending",
    value: "12",
    trend: "-3",
    sub: "vs yesterday",
    color: "orange",
    icon: <RefreshCw size={20} />,
    bg: "from-orange-500 to-red-500",
  },
  {
    label: "Open Disputes",
    value: "4",
    trend: "-2",
    sub: "critical",
    color: "red",
    icon: <ShieldAlert size={20} />,
    bg: "from-red-500 to-red-600",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-xl">
        <p className="text-xs font-black text-gray-900 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="font-bold text-gray-700">{p.name}: </span>
            <span className="font-black text-gray-900">
              {typeof p.value === "number" && p.value > 100
                ? `$${p.value.toLocaleString()}`
                : p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Admin Intelligence
          </h1>
          <p className="text-gray-500 font-medium">
            Platform performance and system health overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {["1m", "3m", "6m", "1y"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${period === p ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            className="rounded-xl border-gray-200 hidden sm:flex"
          >
            Export Report
          </Button>
          <Button className="rounded-xl">System Status</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.bg} text-white shadow-md`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-black px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900 mb-0.5">
              {stat.value}
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-none shadow-lg" hoverable={false}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Revenue Growth
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly earnings and platform fees
                </p>
              </div>
              <Badge variant="green">↑ 28.4% YoY</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analytics.platformRevenue}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="adminRevGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.18}
                      />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="adminFeeGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.18}
                      />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fontWeight: 700, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fontWeight: 700, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(v) =>
                      v === "revenue" ? "Gross Revenue" : "Platform Fees"
                    }
                    wrapperStyle={{
                      fontSize: "12px",
                      fontWeight: 700,
                      paddingTop: "16px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#adminRevGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="fees"
                    name="fees"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fill="url(#adminFeeGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Request Status Pie */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="mb-6">
            <h3 className="text-lg font-black text-gray-900">Request Status</h3>
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
                  innerRadius={48}
                  outerRadius={76}
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
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5 mt-2">
            {analytics.requestStatus.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs font-medium text-gray-600">
                    {s.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: s.color,
                        width: `${(s.value / analytics.requestStatus.reduce((a, b) => a + b.value, 0)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-black text-gray-900 w-8 text-right">
                    {s.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-900">User Growth</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Seekers vs Providers registered
              </p>
            </div>
            <Badge variant="blue">↑ 18.9%</Badge>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.userGrowth}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fontWeight: 700, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fontWeight: 700, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: "12px",
                    fontWeight: 700,
                    paddingTop: "16px",
                  }}
                />
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

        {/* Airport Revenue */}
        <Card className="p-6 border-none shadow-lg" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-900">
                Revenue by Airport
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Top performing locations
              </p>
            </div>
            <a
              href="/admin/reports"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </a>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.revenueByAirport}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fontWeight: 700, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="airport"
                  tick={{ fontSize: 12, fontWeight: 800, fill: "#374151" }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card
            className="p-0 overflow-hidden border-none shadow-lg"
            hoverable={false}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-black text-gray-900">Recent Transactions</h3>
              <a
                href="/admin/transactions"
                className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    {["User", "Lounge", "Amount", "Fee", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.slice(0, 5).map((t) => {
                    const u = users.find((u) => u.id === t.userId);
                    return (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2.5">
                            {u?.avatar && (
                              <img
                                src={u.avatar}
                                alt=""
                                className="w-7 h-7 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <p className="text-xs font-bold text-gray-900">
                                {u?.name}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {t.reference}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-xs font-medium text-gray-600 max-w-[150px] truncate">
                          {t.lounge || "—"}
                        </td>
                        <td className="px-6 py-3.5 text-sm font-black text-gray-900">
                          ${t.amount}
                        </td>
                        <td className="px-6 py-3.5 text-xs font-bold text-green-700">
                          ${t.platformFee}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${t.status === "completed" ? "bg-green-50 text-green-700" : t.status === "pending" ? "bg-yellow-50 text-yellow-700" : "bg-gray-50 text-gray-600"}`}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Airports */}
          <Card className="p-6 border-none shadow-lg" hoverable={false}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-gray-900">Top Airports</h3>
              <Globe size={16} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.revenueByAirport.slice(0, 4).map((ap, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center font-black text-blue-700 text-xs border border-blue-100">
                      {ap.airport}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">
                        {ap.airport}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold">
                        ${(ap.revenue / 1000).toFixed(1)}k revenue
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${(ap.revenue / analytics.revenueByAirport[0].revenue) * 100}%`,
                        }}
                      />
                    </div>
                    <ArrowRight size={12} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Alerts */}
          <Card
            className="p-6 bg-gray-900 text-white border-none shadow-xl"
            hoverable={false}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black">System Alerts</h3>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start">
                <AlertCircle
                  className="text-red-400 shrink-0 mt-0.5"
                  size={16}
                />
                <p className="text-xs font-medium text-red-200 leading-relaxed">
                  High withdrawal volume in EMEA. Manual review triggered.
                </p>
              </div>
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 items-start">
                <ShieldAlert
                  className="text-amber-400 shrink-0 mt-0.5"
                  size={16}
                />
                <p className="text-xs font-medium text-amber-200 leading-relaxed">
                  15 new providers pending KYC verification.
                </p>
              </div>
              <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 items-start">
                <Zap className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs font-medium text-blue-200 leading-relaxed">
                  API response times nominal. All systems operational.
                </p>
              </div>
            </div>
            <button className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-white/30 transition-all">
              View All Alerts
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
