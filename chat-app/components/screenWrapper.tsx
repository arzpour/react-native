import { Dimensions, ImageBackground, Platform, View } from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types/types";
import { colors } from "@/constants/theme";

const ScreenWrapper = ({
  children,
  bgOpacity,
  isModal,
  showPattern,
  style,
}: ScreenWrapperProps) => {
  const { height } = Dimensions.get("window");

  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{ opacity: showPattern ? bgOpacity : 0 }}
      source={require("../assets/images/bgPattern.png")}
    >
      <View
        style={[
          {
            paddingTop,
            paddingBottom,
            flex: 1,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenWrapper;
