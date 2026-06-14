import { getLocationPermission } from "@/helpers/permissions";
import { useGeoState } from "@/store/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const setUserGeolation = useGeoState(state => state.setUserGeolationCoords)
  useEffect(() => {
    const getLocationStartApp = async () => {
      const coors = await getLocationPermission()
      // if(!coors)
      //   return
      // console.log(coors)
      setUserGeolation(coors!)
    }
    getLocationStartApp()
  }, [])
  return <SafeAreaProvider>
    <Stack  screenOptions={{
      headerShown: false
    }}/>
  </SafeAreaProvider>
}
