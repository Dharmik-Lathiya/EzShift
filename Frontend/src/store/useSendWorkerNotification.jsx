import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSendWorkerNoti = create(
  persist(
    (set) => ({
      tripId: null,
      notifications: [],
      setTripId: (tripId) => set({ tripId }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "worker-notification-storage",
    }
  )
);

export default useSendWorkerNoti;
