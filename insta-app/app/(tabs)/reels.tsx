import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "@/utils/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Reels = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top , marginHorizontal: 20}}>
      <Text style={styles.text}>Reels</Text>
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  text: {
    color: color,
  },
});
