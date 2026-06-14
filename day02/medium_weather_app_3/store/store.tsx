import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// type userCoords = {
//   latitude: number;
//   longitude: number;
// };

type userCityInfos = {
  latitude?: number;
  longitude?: number;
  name: string;
  country?: string;
  region?: string;
};

export type Tprops = {
  // userGeolation: userCoords | null;
  userCity: userCityInfos | null;
  setUserGeolationCoords: (address: userCityInfos) => void;
  clearCoords: () => void;
  setUserCity: (address: userCityInfos) => void;
  // getCoords: () => string;
};

export const useGeoState = create<Tprops>()(
  persist(
    (set, get) => ({
      // userGeolation: null,
      userCity: null,
      setUserGeolationCoords: (address) =>
        set((state) => ({
          ...state,
          userCity: {
            latitude: address?.latitude,
            longitude: address?.longitude,
            name: address?.name,
            country: address?.country,
            region: address?.region,
          },
        })),
      setUserCity: (address) =>
        set((state) => ({
          ...state,
          userCity: address,
        })),
      clearCoords: () => set((state) => ({ ...state, userGeolation: null })),
      // getCoords: () => {
      //   return `${get().userGeolation?.latitude.toFixed(6)} ,  ${get().userGeolation?.longitude.toFixed(6)}`;
      // },
    }),
    {
      name: 'userGeo',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
