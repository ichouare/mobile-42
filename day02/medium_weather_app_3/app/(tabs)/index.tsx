import { Text, View } from 'react-native';

import { sharedStyles } from '@/constant/sharedStyle';

import Error from '@/component/Error';
import Loading from '@/component/Loading';
import { COLORS } from '@/constant/color';
import weatherCodes from '@/constant/WheatherCode';
import useGetWhetherCity from '@/Hooks/useGetWhetherStatus';
import { useGeoState } from '@/store/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();

  const city = useGeoState((state) => state.userCity);
  // const userGeolation = useGeoState((state) => state.userCity);
  // const getCoords = useGeoState((state) => state.getCoords);

  const { data, isLoading, isError } = useGetWhetherCity({
    latitude: city?.latitude,
    longitude: city?.longitude,
    current_weather: true,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <View
      style={{
        ...sharedStyles.screenContainer,
      }}
    >
      {city?.name && (
        <Text style={{ color: COLORS.white, fontSize: 43, fontWeight: 700 }}>
          {city.name}
        </Text>
      )}
      {city?.region && (
        <Text style={{ color: COLORS.white, fontSize: 32, fontWeight: 400 }}>
          {city.region}
        </Text>
      )}
      {city?.country && (
        <Text style={{ color: COLORS.white, fontSize: 32, fontWeight: 500 }}>
          {city.country}
        </Text>
      )}
      {data?.current_weather?.weathercode && (
        <Text style={{ color: COLORS.white, fontSize: 24, fontWeight: 400 }}>
          {weatherCodes[data?.current_weather?.weathercode]}
        </Text>
      )}

      {data?.current_weather?.temperature && (
        <Text style={{ color: COLORS.white, fontSize: 24, fontWeight: 400 }}>
          {data?.current_weather?.temperature} °C
        </Text>
      )}
      {data?.current_weather?.windspeed && (
        <Text style={{ color: COLORS.white, fontSize: 24, fontWeight: 400 }}>
          {' '}
          {data?.current_weather?.windspeed} km/h
        </Text>
      )}
    </View>
  );
}
