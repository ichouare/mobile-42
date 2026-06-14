import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [defaultText, setDefaultText] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.desc }}>
        {" "}
        {!defaultText ? "A simple text" : "hello friends !!"}{" "}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ ...styles.btn }}
        onPress={() => setDefaultText((val) => !val)}
      >
        <Text style={{ ...styles.btnText }}>click me</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  desc: {
    color: "#080808",
    fontSize: 32,
    fontFamily: "Bold",
  },
  btn: {
    backgroundColor: "#3981d4",
    height: 50,
    width: 200,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Bold",
  },
});
