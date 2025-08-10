import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "@/utils/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Search = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, marginHorizontal: 20 }}>
      <Text style={styles.text}>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  text: {
    color: color,
  },
});
