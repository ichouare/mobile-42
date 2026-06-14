import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Colors } from '../constants/colors'


type Tprops = {
  title: string
}
export default function Header({title}: Tprops){

    return (
      <View style={{...styles.container}}>
        <Text style={{...styles.title}}> {title} </Text>
         {/* <View style={styles.corner} ><Text  style={{
         writingDirection: "ltr",
         transform: [
  { rotate: "90deg" },
  { translateY: 18 },
  {
    translateX: 30
  }
],
width: 60,
height: 20,
color : "#FFF"

         }}>
          NEW !!</Text></View> */}
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height:60,
    borderBottomWidth:1,
    backgroundColor: "#FFFFFF",
    position: "relative"
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    color: Colors.grayDark
  },
    corner: {
    position: 'absolute',
    top: -10,
    bottom:0,
    right: 30,
    zIndex:100,

    width: 30,
    transform: [
      { skewX: "25deg" }, // 👈 horizontal skew
    ],


    // borderTopWidth: 40,
    // borderLeftWidth: 40,

    backgroundColor: 'red',
    borderLeftColor: 'transparent',
  },
})
