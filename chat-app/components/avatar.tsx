import { StyleSheet, View } from "react-native";
import React from "react";
import { AvatarProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { getAvatarPath } from "@/services/imageService";

const Avatar = ({ uri, isGroup = false, size = 40, style }: AvatarProps) => {
  return (
    <View
      style={[
        styles.avatar,
        { height: verticalScale(size), width: verticalScale(size) },
        style,
      ]}
    >
      <Image
        style={{ flex: 1 }}
        source={getAvatarPath(uri, isGroup)}
        contentFit="cover"
        transition={100}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.neutral100,
    borderRadius: radius.full,
    backgroundColor: colors.neutral200,
    height: verticalScale(47),
    width: verticalScale(47),
    overflow: "hidden",
  },
});
