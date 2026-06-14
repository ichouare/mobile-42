import { Text, View } from "react-native";
import { Cloud, Search, Send } from "lucide-react-native";
import Header from "@/component/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constant/color";
import { sharedStyles } from "@/constant/sharedStyle";

export default function Profil() {
  const inset = useSafeAreaInsets()
  return (
    <View style={{...sharedStyles.screenContainer}}>
      <Text style={{color: COLORS.white}}>Today screen.</Text>
    </View>
  );
}
