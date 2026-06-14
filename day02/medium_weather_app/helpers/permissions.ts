import * as Location from 'expo-location';
import { Alert } from 'react-native';
const getLocationPermission : () =>  Promise<{
    latitude: number;
    longitude: number;
} | undefined>  = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  // if (status !== 'granted') return;
   if (status !== 'granted') {
      Alert.alert('Geolocation Access', 'Please my sure to handle access permission', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
        return;
      }


  let location = await Location.getCurrentPositionAsync({});

   const { latitude, longitude } = location.coords;
  return {latitude, longitude }
};



export { getLocationPermission };
