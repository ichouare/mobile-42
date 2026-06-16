import { Text, View } from "react-native";
import { Cloud, Search, Send } from "lucide-react-native";
import Header from "@/component/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constant/color";
import { sharedStyles } from "@/constant/sharedStyle";
import { useGeoState } from "@/store/store";

export default function Profil() {
  const inset = useSafeAreaInsets()
  const userGeolation = useGeoState(state => state.userGeolation)

  return (
    <View style={{...sharedStyles.screenContainer}}>
      <Text style={{color: COLORS.white}}>Today screen.</Text>
      <Text lineBreakMode="tail"  numberOfLines={2}  style={{color:COLORS.white, fontSize: 32, maxWidth: "80%", textAlign: "center"}}>{userGeolation}</Text>

    </View>
  );
}
