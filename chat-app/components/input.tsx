import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { InputProps } from "@/types/types";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        isFocused && styles.primaryBorder,
      ]}
    >
      {props.icon ?? props.icon}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef ?? props.inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.neutral100,
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: radius.full,
    borderCurve: "continuous",
    height: verticalScale(50),
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
    width: "100%",
  },
  primaryBorder: {
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: verticalScale(14),
    width: "100%",
  },
});
