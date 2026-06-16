import Header from "@/component/header";
import TabBar from "@/component/TabBar";
import { COLORS } from "@/constant/color";
import { withLayoutContext } from "expo-router";
import { Search, Send } from "lucide-react-native";
import { Easing, StyleSheet, useWindowDimensions, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const { Navigator } = createMaterialTopTabNavigator();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const TopTabs = withLayoutContext(Navigator);

  return (
    <View
      style={{
        flex: 1,
        minWidth: isLandscape ? 500 : "100%",
        maxWidth: 500,
        alignSelf: "center",
        position: "relative",
        paddingTop: insets.top,
        backgroundColor: COLORS.black,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Header
          leftIcon={<Search size={20} color="black" />}
          rightIcon={<Send size={24} color="black" />}
        />
      </View>

      <TopTabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          swipeEnabled: true,
          lazy: true,
          tabBarActiveTintColor: COLORS.blue,
          sceneStyle: {
            backgroundColor: "transparent",
          },
          animationEnabled: true,
        }}
      >
        <TopTabs.Screen
          key={0}
          name="index"
          options={{
            title: "Currently",
          }}
        />
        <TopTabs.Screen
          key={1}
          name="today"
          options={{
            title: "Today",
            // tabBarLabelPosition:"below-icon",
          }}
        />
        <TopTabs.Screen
          key={2}
          name="weekly"
          options={{
            title: "Weekly",
          }}
        />
      </TopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,

    backgroundColor: COLORS.black,
  },
});
