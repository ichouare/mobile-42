import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/colors'


type Tprops = {
  value : number | string,
  clickFun: () => void,
  color: string
}

const { width } = Dimensions.get('window');

function MyButton(
{
  value,
  clickFun,
  color
}: Tprops
) {
    return (
      <TouchableOpacity  style={{...styles.btn}} onPress={() => clickFun()}>
        <Text style={{
          fontSize: 32,
          color: Colors.white,

        }}> {value} </Text>
      </TouchableOpacity>
    )

}

export default MyButton


const styles = StyleSheet.create({
  btn: {
    // flex:1,
    borderWidth:1,
    backgroundColor: "#4B5EFC",
    minWidth:  width * 0.2,
    borderRadius:24,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  }
})
