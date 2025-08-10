import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const Brand = () => {
  return (
    <View>
      <FontAwesome
        name="instagram"
        size={60}
        color="red"
        style={styles.logoStyle}
      />{" "}
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({
  logoStyle: {
    marginTop: 50,
    marginBottom: 15,
    margin: "auto",
  },
});
