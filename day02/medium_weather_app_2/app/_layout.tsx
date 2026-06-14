import { getLocationPermission } from '@/helpers/permissions';
import { useGeoState } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const setUserGeolation = useGeoState((state) => state.setUserGeolationCoords);
  useEffect(() => {
    const getLocationStartApp = async () => {
      const coors = await getLocationPermission();
      // if(!coors)
      //   return
      // console.log(coors)
      setUserGeolation(coors!);
    };
    getLocationStartApp();
  }, []);

  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AutocompleteDropdownContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AutocompleteDropdownContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
