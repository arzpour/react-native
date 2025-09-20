import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderProps } from "@/types/types";
import Typo from "./typo";

const Header = ({ leftIcon, rightIcon, style, title = "" }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && (
        <Typo style={styles.title} size={17} fontWeight={"500"}>
          {title}
        </Typo>
      )}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftIcon: {
    alignSelf: "flex-start",
    zIndex: 20,
  },
  rightIcon: {
    alignSelf: "flex-end",
    zIndex: 30,
  },
  title: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    zIndex: 10,
  },
});
