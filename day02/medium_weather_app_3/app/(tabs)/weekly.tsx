import { ScrollView, Text, View } from 'react-native';

import Error from '@/component/Error';
import Loading from '@/component/Loading';
import { COLORS } from '@/constant/color';
import weatherCodes from '@/constant/WheatherCode';
import useGetWhetherCity from '@/Hooks/useGetWhetherStatus';
import { useGeoState } from '@/store/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Today() {
  const insets = useSafeAreaInsets();

  const city = useGeoState((state) => state.userCity);

  const { data, isLoading, isError } = useGetWhetherCity({
    latitude: city?.latitude,
    longitude: city?.longitude,
    // hourly: 'temperature_2m,wind_speed_10m,weather_code',
    daily:
      'temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max',
    forecast_days: 7,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  const unit_t = data?.daily_units?.temperature_2m_max;
  const unit_wind = data?.daily_units?.wind_speed_10m_max;
  const parseData = data?.daily?.time?.map((item: any, index: number) => {
    return {
      time: item,
      temperature: data.daily.temperature_2m_max[index],

      windSpeed: data.daily.wind_speed_10m_max[index],

      weatherCode: data.daily.weather_code[index],
    };
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
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
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          flexWrap: 'nowrap',
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 5,
          paddingBottom: 200,
        }}
      >
        <Text style={{ color: COLORS.white }}>
          {parseData.map((item: any, _: number) => {
            return (
              <View
                key={_}
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                  gap: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ color: COLORS.white, fontWeight: 500, fontSize: 20 }}
                >
                  {item.time}
                </Text>
                <Text
                  style={{ color: COLORS.white, fontWeight: 500, fontSize: 16 }}
                >
                  {item.temperature} {unit_t}
                </Text>
                <Text
                  style={{ color: COLORS.white, fontWeight: 500, fontSize: 16 }}
                >
                  {weatherCodes[item.weatherCode]}
                </Text>
                <Text
                  style={{ color: COLORS.white, fontWeight: 500, fontSize: 16 }}
                >
                  {item.windSpeed} {unit_wind}
                </Text>
              </View>
            );
          })}
        </Text>
      </ScrollView>
    </View>
  );
}
