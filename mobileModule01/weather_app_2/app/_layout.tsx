import { getLocationPermission } from "@/helpers/permissions";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  useEffect(() => {
    getLocationPermission()
  }, [])
  return <SafeAreaProvider>
    <Stack  screenOptions={{
      headerShown: false
    }}/>
  </SafeAreaProvider>
}
