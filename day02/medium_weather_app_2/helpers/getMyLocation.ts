import * as Location from 'expo-location';
import { Alert } from 'react-native';

export async function getMyLocation() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required.');

      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (!location) {
      Alert.alert(
        'Geolocation Error',
        'Something went wrong while getting location.'
      );

      return null;
    }

    const { latitude, longitude } = location.coords;
    const address :  Location.LocationGeocodedAddress[] =
      await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });


    return { latitude, longitude, name : address[0]?.city || null , region : address[0]?.region || null, country : address[0]?.country || null };
  } catch (error) {
    console.log(error);

    Alert.alert('Error', 'Failed to get your location.');

    return null;
  }
}

export default getMyLocation;
