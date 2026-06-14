import { COLORS } from "@/constant/color";
import { sharedStyles } from "@/constant/sharedStyle";
import { useGeoState } from "@/store/store";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profil() {
  const inset = useSafeAreaInsets()

  const city = useGeoState(state => state.userCity)
  const getCoords = useGeoState(state => state.getCoords)

  return (
    <View style={{...sharedStyles.screenContainer}}>
      <Text style={{color: COLORS.white}}>Today screen.</Text>
            <Text lineBreakMode="tail"  numberOfLines={2}  style={{color:COLORS.white, fontWeight: "bold",  fontSize: 32, maxWidth: "80%", textAlign: "center"}}>{city || getCoords()}</Text>


    </View>
  );
}
