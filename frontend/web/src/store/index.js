import { create } from "zustand";

export const useStore = create((set) => ({
  user: {
    id: "u1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "provider",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    walletBalance: 1240.5,
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  notifications: [
    {
      id: 1,
      title: "New Request",
      message: "You have a new lounge access request for JFK.",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment for your DXB offer has been processed.",
      time: "1 hour ago",
      read: true,
    },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { id: Date.now(), ...notification, time: "Just now", read: false },
        ...state.notifications,
      ],
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
