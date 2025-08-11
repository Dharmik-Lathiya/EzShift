import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVehicleStore = create(persist(
    (set, get) => ({
        vehicleType: "",
        vehicleOwner: "",
        vehicleName: "",
        vehicleModel: "",
        vehicleCompany: "",
        vehicleNumber: "",
        drivingLicenseNumber: "",
        drivingLicense: "",
        vehicleDocument: "",
        ownerId:"",

        setVehicleType:(val) => set({vehicleType:val}),
        setVehicleOwner:(val) => set({vehicleOwner:val}),
        setVehicleName:(val) => set({vehicleName:val}),
        setVehicleModel:(val) => set({vehicleModel:val}),
        setVehicleCompany:(val) => set({vehicleCompany:val}),
        setVehicleNumber:(val) => set({vehicleNumber:val}),
        setDrivingLicenseNumber:(val) => set({drivingLicenseNumber:val}),
        setDrivingLicense:(val) => set({drivingLicense:val}),
        setVehicleDocument:(val) => set({vehicleDocument:val}),
        setOwnerId:(val) => set({ownerId:val}),

        fetchVehicleDetails: async () => {
            const response = await fetch("/api/vehicle");
            const data = await response.json();
            set({
                vehicleType: data.type,
                vehicleOwner: data.owner,
                vehicleName: data.name,
                vehicleModel: data.model,
                vehicleCompany: data.company,
                vehicleNumber: data.number,
                drivingLicenseNumber: data.licenseNumber,
                drivingLicense: data.drivingLicense,
                vehicleDocument: data.document,
                ownerId: data.ownerId
            });
        }

    }),{
        name: "vehicle-storage",
        getStorage: () => localStorage,
        partialize: (state) => ({
            vehicleType: state.vehicleType,
            vehicleOwner: state.vehicleOwner,
            vehicleName: state.vehicleName,
            vehicleModel: state.vehicleModel,
            vehicleCompany: state.vehicleCompany,
            vehicleNumber: state.vehicleNumber,
            drivingLicenseNumber: state.drivingLicenseNumber,
            drivingLicense: state.drivingLicense,
            vehicleDocument: state.vehicleDocument,
            ownerId: state.ownerId
        })
    }

))

export default useVehicleStore;