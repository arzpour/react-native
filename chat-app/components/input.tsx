import { StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { InputProps } from "@/types/types";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  return (
    <Pressable
      style={[
        styles.container,
        props.containerStyle,
        isFocused && styles.primaryBorder,
      ]}
      onPress={() => inputRef.current?.focus()}
    >
      {props.icon}
      <TextInput
        ref={inputRef}
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </Pressable>
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
    textAlign: "right",
  },
});
