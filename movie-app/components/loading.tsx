import * as Progress from "react-native-progress";
import { Dimensions, View } from "react-native";
import React from "react";
import { theme } from "@/theme";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Progress.CircleSnail
        thickness={10}
        size={120}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
