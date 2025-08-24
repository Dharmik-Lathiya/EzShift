import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculatePricing } from '../utils/pricing';

const useTripStore = create(persist(
  (set, get) => ({
    clientId: '',
    pickupAddress: '',
    dropAddress: '',
    date: '',
    timeSlot: '',
    vehicleType: '',
    needWorkers: false,
    numWorkers: 0,
    note: '',
    distance: '',
    rate: '',
    pricing: {},
    vehicle: null, 
    allTrips: [],
    loading: false,
    error: null,

    // Setters
    setClientId: (val) => set({ clientId: val }),
    setFullName: (val) => set({ fullName: val }),
    setMobileNo: (val) => set({ mobileNo: val }),
    setPickupAddress: (val) => set({ pickupAddress: val }),
    setDropAddress: (val) => set({ dropAddress: val }),
    setDate: (val) => set({ date: val }),
    setTimeSlot: (val) => set({ timeSlot: val }),
    setVehicleType: (val) => {
      set({ vehicleType: val });
      get().calculateAndSetPricing();
    },
    setNeedWorkers: (val) => set({ needWorkers: val }),
    setNumWorkers: (val) => {
      set({ numWorkers: val });
      get().calculateAndSetPricing();
    },
    setNote: (val) => set({ note: val }),
    setDistance: (val) => {
      set({ distance: val });
      get().calculateAndSetPricing();
    },
    setPricing: (val) => set({ pricing: val }),
    setRate: (val) => set({ rate: val }),

    calculateAndSetPricing: () => {
      const { distance, vehicleType, numWorkers } = get();
      const pricing = calculatePricing(distance, vehicleType, numWorkers);
      set({ pricing });
    },

    // Trip fetching
    fetchAllTrips: async () => {
      set({ loading: true, error: null });
      try {
        const data = await tripAPI.getAllTrips();
        set({ allTrips: data, loading: false });
        return data;
      } catch (error) {
        console.error('Error fetching trips:', error);
        set({ 
          error: error.message || 'Failed to fetch trips', 
          loading: false 
        });
        throw error;
      }
    },

    // Clear error
    clearError: () => set({ error: null }),
  }),
  {
    name: 'trip-store',
    partialize: (state) => ({
      clientId: state.clientId,
      fullName: state.fullName,
      mobileNo: state.mobileNo,
      pickupAddress: state.pickupAddress,
      dropAddress: state.dropAddress,
      date: state.date,
      timeSlot: state.timeSlot,
      vehicleType: state.vehicleType,
      needWorkers: state.needWorkers,
      numWorkers: state.numWorkers,
      note: state.note,
      distance: state.distance,
      pricing: state.pricing,
      rate: state.rate,
    })
  }
));

export default useTripStore;