import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.neutral900}
      />
      <Animated.Image
        source={require("../assets/images/splashImage.png")}
        entering={FadeInDown.springify(700)}
        style={styles.logo}
        resizeMode={"contain"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "23%",
    aspectRatio: 1,
  },
});
