import React from "react";
import { useStore } from "@/store";

export default function CustomerDashboard() {
  const { user } = useStore();
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your lounge access today.
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <a
            href="/app/marketplace"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            Find Access
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Available Balance",
            value: `$${user?.walletBalance.toFixed(2)}`,
            color: "blue",
          },
          { label: "Total Earnings", value: "$4,120.00", color: "green" },
          { label: "Active Offers", value: "3", color: "purple" },
          { label: "Pending Requests", value: "12", color: "orange" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Earnings Analytics</h3>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-1 text-gray-600">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed">
            Chart Placeholder (Recharts)
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              {
                title: "Payment Received",
                desc: "JFK Lounge Access Sale",
                amount: "+$45.00",
                time: "2h ago",
              },
              {
                title: "New Request",
                desc: "DXB Terminal 3 Seekers",
                amount: "Pending",
                time: "5h ago",
              },
              {
                title: "Withdrawal",
                desc: "Bank Transfer to ...1234",
                amount: "-$500.00",
                time: "1d ago",
              },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold ${item.amount.startsWith("+") ? "text-green-600" : item.amount.startsWith("-") ? "text-red-600" : "text-orange-500"}`}
                  >
                    {item.amount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
