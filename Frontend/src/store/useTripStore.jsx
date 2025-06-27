import { create } from 'zustand';

const useTripStore = create((set) => ({
  pickupAddress: '',
  dropAddress: '',
  vehicleType: '',
  needWorkers: false,
  numWorkers: 0,
  distance: null,
  pricing: null,

  setPickupAddress: (value) => set({ pickupAddress: value }),
  setDropAddress: (value) => set({ dropAddress: value }),
  setVehicleType: (value) => set({ vehicleType: value }),
  setNeedWorkers: (value) => set({ needWorkers: value }),
  setNumWorkers: (value) => set({ numWorkers: value }),
  setDistance: (value) => set({ distance: value }),
  setPricing: (value) => set({ pricing: value }),
}));

export default useTripStore;
