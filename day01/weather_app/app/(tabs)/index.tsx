import { StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constant/color";
import { sharedStyles } from "@/constant/sharedStyle";

export default function Index() {
  const inset = useSafeAreaInsets()
  return (
    <View

      style={{
        ...sharedStyles.screenContainer
      }}
    >


      <Text style={{color: COLORS.white}}>Currently screen.</Text>
    </View>
  );
}


