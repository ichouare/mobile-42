import Header from '@/component/header';
import TabBar from '@/component/TabBar';
import { COLORS } from '@/constant/color';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { LocateFixed, Search } from 'lucide-react-native';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const { Navigator } = createMaterialTopTabNavigator();
  const TopTabs = withLayoutContext(Navigator);
  const image = require('../../assets/images/bg.jpg');
  return (
    <ImageBackground
      source={image}
      resizeMode="stretch"
      style={{
        flex: 1,
        position: 'relative',
        paddingTop: insets.top,
        justifyContent: 'center',

        // backgroundColor: COLORS.black,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Header
          leftIcon={<Search size={20} color="black" />}
          rightIcon={<LocateFixed size={24} color="blue" />}
        />
      </View>

      <TopTabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          swipeEnabled: true,
          lazy: true,
          tabBarActiveTintColor: COLORS.blue,
          sceneStyle: {
            backgroundColor: 'transparent',
          },
          animationEnabled: true,
        }}
      >
        <TopTabs.Screen
          key={0}
          name="index"
          options={{
            title: 'Currently',
          }}
        />
        <TopTabs.Screen
          key={1}
          name="today"
          options={{
            title: 'Today',
            // tabBarLabelPosition:"below-icon",
          }}
        />
        <TopTabs.Screen
          key={2}
          name="weekly"
          options={{
            title: 'Weekly',
          }}
        />
      </TopTabs>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,

    backgroundColor: COLORS.black,
  },
});
