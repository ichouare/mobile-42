import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import Error from '@/component/Error';
import Loading from '@/component/Loading';
import WeatherIcon from '@/component/WheatherIcon';
import { COLORS } from '@/constant/color';
import weatherCodes from '@/constant/WheatherCode';
import useGetWhetherCity from '@/Hooks/useGetWhetherStatus';
import { useGeoState } from '@/store/store';
import { Wind } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const hourlyData = [
  { time: '12am', temp: 24 },
  { time: '1am', temp: 23 },
  { time: '2am', temp: 23 },
  { time: '3am', temp: 22 },
  { time: '4am', temp: 22 },
  { time: '5am', temp: 23 },
  { time: '6am', temp: 25 },
  { time: '7am', temp: 27 },
  { time: '8am', temp: 28 },
  { time: '9am', temp: 29 },
  { time: '10am', temp: 30 },
  { time: '11am', temp: 31 },
  { time: '12pm', temp: 32 },
  { time: '1pm', temp: 31 },
  { time: '2pm', temp: 30 },
  { time: '3pm', temp: 29 },
  { time: '4pm', temp: 28 },
  { time: '5pm', temp: 27 },
  { time: '6pm', temp: 26 },
];

export default function Today() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const city = useGeoState((state) => state.userCity);

  const { data, isLoading, isError } = useGetWhetherCity({
    latitude: city?.latitude,
    longitude: city?.longitude,
    hourly: 'temperature_2m,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    forecast_days: 1,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const temperatureData = data?.hourly?.time?.map(
    (item: any, index: number) => ({
      temp: data.hourly.temperature_2m[index],
      hour: item.slice(11, 16),
      windspeed: data.hourly.wind_speed_10m[index],
      code: data?.hourly?.weather_code[index],
    })
  );

  // const windData = data?.hourly?.time?.map((item: any, index: number) => ({
  //   value: data.hourly.wind_speed_10m[index],
  // }));

  return (
    <View style={{ ...style.container }}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 5,
        }}
      >
        <Text style={{ ...style.title }}>Daily Forecast</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: 2,
          }}
        >
          {city?.name && (
            <>
              <Text
                style={{
                  color: COLORS.blackText,
                  fontSize: 24,
                  fontWeight: 500,
                }}
              >
                {city.name}
              </Text>
              <Text>,</Text>
            </>
          )}
          {city?.region && (
            <>
              <Text
                style={{
                  color: COLORS.blackText,
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                {city.region}
              </Text>
              <Text>,</Text>
            </>
          )}
          {city?.country && (
            <Text
              style={{ color: COLORS.blackText, fontSize: 18, fontWeight: 400 }}
            >
              {city.country}
            </Text>
          )}
        </View>
      </View>
      <View style={{ ...style.card, height: 296 }}></View>
      <View
        style={{
          ...style.card,
          backgroundColor: 'trensparent',
          flex: 1,
          padding: 10,
        }}
      >
        <FlatList
          data={temperatureData}
          scrollsToTop={true}
          contentContainerStyle={{ paddingBlock: 100 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#ffffff5a',
                height: 74,
                borderRadius: 16,
                paddingHorizontal: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <View style={{ gap: 4 }}>
                <Text style={{ ...style.text }}>{item.hour}</Text>
                <Text style={{ ...style.text }}>{weatherCodes[item.code]}</Text>
              </View>
              <View
                style={{
                  flexGrow: 0.3,
                  gap: 15,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <WeatherIcon code={item.code} size={34} />
                <Text style={{ ...style.text }}>{item.temp}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Wind color={COLORS.blue} />
                <Text>{item.windspeed} km/h</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,

    padding: 16,
    gap: 12,
  },
  title: {
    color: COLORS.black,
    fontSize: 28,
    fontWeight: '600',
  },
  card: {
    width: '100%',
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  text: {
    color: '#414755',
    fontSize: 16,
    lineHeight: 24,
  },
});
