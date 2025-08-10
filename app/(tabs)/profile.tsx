import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "@/utils/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, marginHorizontal: 20 }}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    color: color,
  },
});
