import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "@/utils/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Shopping = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, marginHorizontal: 20 }}>
      <Text style={styles.text}>Shopping</Text>
    </View>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  text: {
    color: color,
  },
});
