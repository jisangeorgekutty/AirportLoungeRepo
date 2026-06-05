import React from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
  Wallet as WalletIcon,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History,
  Download,
  Plus,
} from "lucide-react";
import { useStore } from "@/store";

export default function WalletPage() {
  const { user } = useStore();

  const transactions = [
    {
      id: "tx1",
      type: "Earnings",
      amount: 45.0,
      date: "June 2, 2026",
      status: "completed",
      ref: "#LL-8291",
    },
    {
      id: "tx2",
      type: "Withdrawal",
      amount: -150.0,
      date: "June 1, 2026",
      status: "pending",
      ref: "#LL-8285",
    },
    {
      id: "tx3",
      type: "Earnings",
      amount: 65.0,
      date: "May 30, 2026",
      status: "completed",
      ref: "#LL-8240",
    },
    {
      id: "tx4",
      type: "Earnings",
      amount: 45.0,
      date: "May 28, 2026",
      status: "completed",
      ref: "#LL-8212",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Wallet</h1>
          <p className="text-gray-500 font-medium">
            Manage your earnings and withdrawals.
          </p>
        </div>
        <Button className="rounded-xl gap-2 font-bold shadow-blue-600/10 h-12">
          <Download size={18} /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 rounded-[2.5rem] border-none shadow-2xl shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-blue-100 font-semibold mb-1 uppercase tracking-widest text-xs">
                  Current Balance
                </p>
                <h2 className="text-6xl font-black tracking-tighter">
                  ${user?.walletBalance.toFixed(2)}
                </h2>
              </div>
              <div className="w-16 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <CreditCard size={24} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Lifetime Earnings
                </p>
                <p className="text-xl font-bold">$4,820.00</p>
              </div>
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Total Payouts
                </p>
                <p className="text-xl font-bold">$3,580.00</p>
              </div>
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Active Offers
                </p>
                <p className="text-xl font-bold">4</p>
              </div>
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Platform Fee
                </p>
                <p className="text-xl font-bold">5%</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8 bg-white border-gray-100">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Instant Payouts</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your earnings are credited immediately after the guest validates
              their entry at the lounge.
            </p>
            <Button
              variant="dark"
              className="w-full rounded-xl h-12 font-bold gap-2"
            >
              <Plus size={18} /> Withdraw Funds
            </Button>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <History size={20} className="text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900">
            Transaction History
          </h3>
        </div>

        <Card className="p-0 overflow-hidden rounded-3xl border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Transaction Details
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Reference
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                        >
                          {tx.amount > 0 ? (
                            <ArrowDownLeft size={20} />
                          ) : (
                            <ArrowUpRight size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {tx.type}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            LoungeLink System
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                      {tx.date}
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-400 font-mono">
                      {tx.ref}
                    </td>
                    <td className="px-8 py-6">
                      <Badge
                        variant={tx.status === "completed" ? "green" : "yellow"}
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p
                        className={`text-lg font-black ${tx.amount > 0 ? "text-green-600" : "text-gray-900"}`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount.toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
