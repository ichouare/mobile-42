import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../component/Header";
import { Colors } from "../constants/colors";
import MyButton from "../component/Button";

const ButtonData = [
  {
    label: "C",
    value: "C",
    color: Colors.red,
  },
  {
    label: "AC",
    value: "AC",
    color: Colors.red,
  },
  {
    label: "%",
    value: "%",
    color: Colors.gray,
  },
  {
    label: "/",
    value: "/",
    color: Colors.gray,
  },
  {
    label: "1",
    value: 1,
    color: Colors.white,
  },
  {
    label: "2",
    value: 2,
    color: Colors.white,
  },
  {
    label: "3",
    value: 3,
    color: Colors.white,
  },
  {
    label: "*",
    value: "*",
    color: Colors.gray,
  },
  {
    label: "4",
    value: 4,
    color: Colors.white,
  },
  {
    label: "5",
    value: 5,
    color: Colors.white,
  },
  {
    label: "6",
    value: 6,
    color: Colors.white,
  },
  {
    label: "-",
    value: "-",
    color: Colors.gray,
  },
  {
    label: "7",
    value: 7,
    color: Colors.white,
  },
  {
    label: "8",
    value: 8,
    color: Colors.white,
  },
  {
    label: "9",
    value: 9,
    color: Colors.white,
  },
  {
    label: "+",
    value: "+",
    color: Colors.gray,
  },
  {
    label: "0",
    value: 0,
    color: Colors.white,
  },
  {
    label: "00",
    value: "00",
    color: Colors.white,
  },

  {
    label: "=",
    value: "=",
    color: Colors.gray,
  },
];

export default function Index() {
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.white,
        paddingTop: inset.top,
      }}
    >
      <Header title="Calculator" />
      <View style={{ ...styles.container }}>
        <TextInput
          style={{
            ...styles.input,
            fontSize: 40,
            opacity: 0.4,
            color: "#E1E1E1",
          }}
          placeholder=""
          value="0"
          editable={false}
        />
        <TextInput
          style={{ ...styles.input, color: Colors.white, fontSize: 32 }}
          value="0"
          editable={false}
        />
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            rowGap: 20,
            columnGap: 10,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {ButtonData.map((item, _) => (
            <MyButton
              key={_}
              value={item.value}
              clickFun={() => console.log("my value is ", item.label)}
              color={Colors[item.color]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    rowGap: 16,
    backgroundColor: Colors.background,
  },
  input: {
    height: 60,
    borderRadius: 20,
  },
});
