import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../component/Header";
import { Colors } from "../constants/colors";
import MyButton from "../component/Button";
import { ButtonData, OPERATION } from "../constant/data";
import { useReducer } from "react";

//TODO: chek length of text

const formatResultForDisplay = (res: any) => {
  const s = String(res ?? "");
  const n = Number(s);
  const maxLen = 18;
  if (!Number.isFinite(n)) return s;
  // If already short enough, return as-is (trim trailing zeros)
  if (s.length <= maxLen) return s;
  // For very large or small numbers use exponential with limited precision
  if (Math.abs(n) >= 1e10 || Math.abs(n) < 1e-6) return n.toExponential(6);
  // Otherwise use precision but keep total length bounded
  return n.toPrecision(12).replace(/(?:\.0+|(?<=\.[0-9]*?)0+)$/, "");
};

const initialArg = {
  currentValue: "",
  result: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case OPERATION.SUBTRACT:
    case OPERATION.DIVIDE:
    case OPERATION.DOT:
    case OPERATION.PERCENTAGE:
    case OPERATION.MULTIPLY:
    case OPERATION.ADD:
      if (
        ["+", "-", "/", "*", ".", "%"].includes(
          state.currentValue[state.currentValue.length - 1],
        )
      ) {
        // console.log(
        //   "here ---<",
        //   state.currentValue[state.currentValue.length - 1],
        // );
        return state;
      }
      return {
        ...state,
        // result: state.result - state.currentValue,
        currentValue:
          state.currentValue === "0"
            ? String(action.value)
            : String(state.currentValue) + String(action.value),
      };
    case OPERATION.EQUAL:
      try {
        const checkStr = String(state.currentValue);
        if (["/", "*", "%"].includes(checkStr[0]))
          return {
            ...state,
            currentValue: String(0),
            result: "malFormed expression",
          };
        // Using Function constructor instead of eval
        const fn = new Function("return " + state.currentValue);
        const result = fn();
        return {
          ...state,
          currentValue: String(0),
          result: String(formatResultForDisplay(result)),
        };
      } catch (error) {
        return state;
      }
    case OPERATION.REMOVE:
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
    case OPERATION.CLEAR:
      return { currentValue: "", result: "0" };
    default:
      return {
        ...state,
        // result: state.result - state.currentValue,
        currentValue:
          state.currentValue === "0"
            ? String(action.value)
            : String(state.currentValue) + String(action.value),
      };
  }
};

export default function Index() {
  const inset = useSafeAreaInsets();
  const [state, dispatch] = useReducer(reducer, initialArg);
  console.log(state);

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
          value={state.currentValue}
          editable={false}
        />
        <TextInput
          style={{ ...styles.input, color: Colors.white, fontSize: 32 }}
          value={state.result}
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
              clickFun={() =>
                dispatch({
                  type: item.action,
                  value: item.value,
                })
              }
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
