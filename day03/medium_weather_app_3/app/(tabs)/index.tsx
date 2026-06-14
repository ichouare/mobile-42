import { Text, View } from 'react-native';

import { sharedStyles } from '@/constant/sharedStyle';

import Error from '@/component/Error';
import Loading from '@/component/Loading';
import WeatherIcon from '@/component/WheatherIcon';
import { COLORS } from '@/constant/color';
import useGetWhetherCity from '@/Hooks/useGetWhetherStatus';
import { useGeoState } from '@/store/store';
import { Wind } from 'lucide-react-native';
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
      <WeatherIcon code={data?.current_weather?.weathercode} />
      <View
        style={{
          // flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: 1,
        }}
      >
        {city?.name && (
          <>
            <Text
              style={{ color: COLORS.blackText, fontSize: 16, fontWeight: 500 }}
            >
              {city.name}
            </Text>
            <Text>,</Text>
          </>
        )}
        {city?.region && (
          <>
            <Text
              style={{ color: COLORS.blackText, fontSize: 16, fontWeight: 400 }}
            >
              {city.region}
            </Text>
            <Text>,</Text>
          </>
        )}
        {city?.country && (
          <Text
            style={{ color: COLORS.blackText, fontSize: 16, fontWeight: 400 }}
          >
            {city.country}
          </Text>
        )}
      </View>
      {data?.current_weather?.temperature && (
        <Text style={{ color: COLORS.blue, fontSize: 80, fontWeight: 600 }}>
          {data?.current_weather?.temperature} °
        </Text>
      )}
      {data?.current_weather?.windspeed && (
        <View
          style={{
            height: 64,
            width: 161,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
          }}
        >
          <Wind color={COLORS.blue} />
          <Text
            style={{ color: COLORS.blackText, fontSize: 24, fontWeight: 500 }}
          >
            {' '}
            {data?.current_weather?.windspeed} km/h
          </Text>
        </View>
      )}
    </View>
  );
}
