import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Loading from "./loading";

const Button = ({ children, style, onPress, loading = false }: ButtonProps) => {
  if (loading) {
    return (
      <View style={[style, styles.button, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    borderCurve: "continuous",
    height: verticalScale(56),
    justifyContent: "center",
    alignItems: "center",
  },
});
