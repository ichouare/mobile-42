import { COLORS } from "@/constant/color";
import getMyLocation from "@/helpers/getMyLocation";

import { useGeoState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableHighlight, View } from "react-native";

type Tprops = {
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  rightFunc?: () => void;
};

function Header({ leftIcon, rightIcon, rightFunc }: Tprops) {
  const [geo, setGeo] = useState("");
  const setUserGeolationCoords = useGeoState(
    (state) => state.setUserGeolationCoords,
  );
  const clearCoords = useGeoState((state) => state.clearCoords);
  const setUserCity = useGeoState((state) => state.setUserCity);

  useEffect(() => {
    setUserCity(geo);
  }, [geo]);
  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.inputContainer }}>
        {leftIcon}
        <TextInput
          numberOfLines={1}
          maxLength={40}
          value={geo}
          onChangeText={setGeo}
          style={{
            ...styles.input,
          }}
        />
      </View>

      <TouchableHighlight
        onPress={async () => {
          const coords = await getMyLocation();
          setGeo("");
          setUserGeolationCoords(coords!);
        }}
        style={{ ...styles.btn }}
        activeOpacity={0.8}
      >
        {rightIcon}
      </TouchableHighlight>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },
  input: {
    flex: 1,
    height: "100%",
    // borderWidth:1,
  },
  btn: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
});
