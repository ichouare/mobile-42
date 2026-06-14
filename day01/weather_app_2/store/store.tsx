
import {create}  from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";


type Tprops = {
  userGeolation: string,
  setUserGeolation: (address: string) => void
}

export const useGeoState =  create<Tprops>()(persist((set, get) =>({
  userGeolation: "",
  setUserGeolation: (address) => set((state) => ({
    userGeolation: address
  }))
}), {
  name: "userGeo",
  storage: createJSONStorage(() =>  AsyncStorage)
}))