import Header from "@/component/header";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return <SafeAreaProvider>

    {/* <Header leftIcon={} /> */}

    <Stack  screenOptions={{
      headerShown: false
    }}/>
  </SafeAreaProvider>
}
