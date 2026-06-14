import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loading() {
  useEffect(() => {
    async function wait() {
      await new Promise((resolve) => {
        setTimeout(() => {
          return resolve(true);
        }, 200);
      });
    }
  }, []);
  return (
    <View style={{ ...styles.container }}>
      <ActivityIndicator size={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
