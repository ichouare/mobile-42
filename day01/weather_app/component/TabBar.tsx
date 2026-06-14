import { COLORS } from '@/constant/color'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Calendar1, CalendarDays, Timer } from 'lucide-react-native'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PagerView from "react-native-pager-view";


export default function TabBar({state, descriptors, navigation} : MaterialTopTabBarProps)  {


  const icons = {
    "index" : (props) =>  <Timer {...props} />,
    "today" : (props) => <Calendar1 {...props} />,
    "weekly" : (props) => <CalendarDays {...props} />,

  }

    return (

      <View  style={{...styles.tabbar}}>

      {state.routes.map((route, index) => {

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };


       return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            // onLongPress={onLongPress}
          >
            {
                icons[route.name]({
                    color: isFocused? COLORS.blue: COLORS.black,
                    size:  24,
                    style: {
                      transform: [
                        {
                          scale: isFocused ? 1.05 : 1
                        }
                      ]
                    }
                })
            }
            <Text style={{
                color: isFocused ? COLORS.blue : COLORS.black,
                fontSize: 11,


            }}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })
     }
      </View>
    )

}

const styles = StyleSheet.create({
  tabbar: {
        width: "90%",
        height: 65,
        position: 'absolute',
        bottom: 25,
        zIndex: 100,

        // left: "5%",
        transform: [
          {
            translateX: "-0%"
          }
        ],
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        // paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabbarItem: {
      flex:1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent : "center",
      gap:10,
      height: "100%",

    }
})
