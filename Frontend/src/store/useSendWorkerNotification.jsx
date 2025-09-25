import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSendWorkerNoti = create(
  persist(
    (set) => ({
      tripId: null,
      notifications: [],
      setTripId: (tripId) => set({ tripId }),
      addNotification: (notification) =>
        set((state) => {
          const next = [{ ...notification, seen: false }, ...state.notifications];
          return { notifications: next.slice(0, 5) };
        }),
      markSeen: (id, seen = true) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, seen } : n
          ),
        })),
      markAllSeen: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, seen: true })),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "worker-notification-storage",
    }
  )
);

export default useSendWorkerNoti;
