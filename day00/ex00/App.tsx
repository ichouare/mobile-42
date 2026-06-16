import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.desc }}> A simple text </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ ...styles.btn }}
        onPress={() => console.log("button is cliked !!")}
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
