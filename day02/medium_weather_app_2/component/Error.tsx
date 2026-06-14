import { COLORS } from '@/constant/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Error() {
  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.errormsg }}>
        Ops!! somthin Wrong please try Again
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errormsg: {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.red,
  },
});
