import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { verticalScale } from "@/utils/styling";
import { BackButtonProps } from "@/types/types";
import { useRouter } from "expo-router";
import { colors } from "@/constants/theme";

const BackButton = ({
  color = colors.white,
  iconSize = 26,
  style,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[style, styles.button]}
      onPress={() => router.back()}
    >
      <Ionicons
        name="chevron-back"
        size={verticalScale(iconSize)}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {},
});
