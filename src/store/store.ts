import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { BookingInterface } from "../models/BookingModel";
import { UserInterface } from "../models/ProfileModel";
import { PropertyInterface } from "../models/PropertyModel";

export type State = {
  properties: PropertyInterface[];
  bookings: BookingInterface[];
  user: UserInterface | null;
  _hasHydrated: boolean;
};

export type Actions = {
  setProperties: (data: PropertyInterface[]) => void;
  setBookings: (data: BookingInterface[]) => void;
  setUserProfile: (data: UserInterface) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      properties: [],
      bookings: [],
      user: null,
      setProperties: (data: PropertyInterface[]) => set({ properties: data }),
      setBookings: (data: BookingInterface[]) => set({ bookings: data }),
      setUserProfile: (data: UserInterface) => set({ user: data }),
      _hasHydrated: false,
    }),
    {
      name: "raft_storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

export const useStoreHydration = () => {
  return useStore((state) => state._hasHydrated);
};
