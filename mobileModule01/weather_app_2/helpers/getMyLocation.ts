import * as Location from "expo-location"
import { Alert } from "react-native";

export async function getMyLocation() {
  try {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required."
      );

      return null;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;

    const address =
      await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

    const city =
      address[0]?.city ||
      address[0]?.region ||
      null;

    if (!city) {
      Alert.alert(
        "Geolocation Error",
        "Something went wrong while getting location."
      );

      return null;
    }

    return city;
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Failed to get your location."
    );

    return null;
  }
}


export default getMyLocation