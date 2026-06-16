import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type userCoords = {
  latitude: number;
  longitude: number;
};

type Tprops = {
  userGeolation: userCoords | null;
  userCity: string;
  setUserGeolationCoords: (address: userCoords) => void;
  clearCoords: () => void;
  setUserCity: (address: string) => void;
  getCoords: () => string;
};

export const useGeoState = create<Tprops>()(
  persist(
    (set, get) => ({
      userGeolation: null,
      userCity: "",
      setUserGeolationCoords: (address) =>
        set((state) => ({
          ...state,
          userGeolation: {
            latitude: address.latitude,
            longitude: address.longitude,
          },
        })),
      setUserCity: (address) =>
        set((state) => ({
          ...state,
          userCity: address,
        })),
      clearCoords: () => set((state) => ({ ...state, userGeolation: null })),
      getCoords: () => {
        return `${get().userGeolation?.latitude?.toFixed(6)} ,  ${get().userGeolation?.longitude?.toFixed(6)}`;
      },
    }),
    {
      name: "userGeo",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
