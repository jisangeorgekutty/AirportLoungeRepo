import React, { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { Search, MapPin, Filter, Star, ArrowRight } from "lucide-react";
import { offers, airports } from "@/mock";
import { motion } from "motion/react";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOffers = offers.filter(
    (o) =>
      o.loungeName.toLowerCase().includes(search.toLowerCase()) ||
      o.terminal.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="relative rounded-[2rem] overflow-hidden bg-gray-900 p-10 md:p-16 text-white mb-12">
        <div className="absolute top-0 right-0 w-1/2 h-full -z-0 opacity-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5 text-sm">
            Marketplace
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Find Your Perfect <br />
            Lounge Sanctuary
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            Access premium airport lounges worldwide. Secure, verified, and
            ready for your next layover.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center px-4 py-2 group focus-within:bg-white/20 transition-all">
              <Search
                className="text-white/40 group-focus-within:text-white"
                size={20}
              />
              <input
                type="text"
                placeholder="Where are you flying from?"
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 w-full ml-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="rounded-2xl h-14 px-8 font-bold text-lg">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            "All",
            "Priority Pass",
            "Airline Lounge",
            "Credit Card",
            "Independent",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${filter === f ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white text-gray-600 border border-gray-100 hover:border-blue-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button
          variant="secondary"
          className="rounded-full gap-2 px-5 font-bold"
        >
          <Filter size={18} /> Advanced Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOffers.map((offer, i) => {
          const airport = airports.find((a) => a.id === offer.airportId);
          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden p-0 rounded-[2.5rem]">
                <div className="relative h-56">
                  <img
                    src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=600"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                    ${offer.price}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm font-semibold mb-1">
                        <MapPin size={14} className="text-blue-500" />
                        {airport?.code} • {offer.terminal}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {offer.loungeName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star
                        size={14}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      <span className="text-xs font-bold text-yellow-700">
                        {offer.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Access Type
                      </span>
                      <span className="font-bold text-gray-900">
                        {offer.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Available Seats
                      </span>
                      <span className="font-bold text-gray-900">
                        {offer.entries} Guests
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-8 rounded-2xl font-bold h-12 shadow-blue-600/10 group">
                    Book Now
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
