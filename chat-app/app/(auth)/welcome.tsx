import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Animated, { FadeIn } from "react-native-reanimated";
import Button from "@/components/button";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper showPattern={true}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo color={colors.white} fontWeight={"900"} size={43}>
            Bubbly
          </Typo>
        </View>
        <Animated.Image
          source={require("../../assets/images/welcome.png")}
          entering={FadeIn.duration(700).springify()}
          style={styles.welcomeImage}
          resizeMode={"contain"}
        />

        <View>
          <Typo color={colors.white} size={25} fontWeight={"800"}>
            Stay Connected
          </Typo>
          <Typo color={colors.white} size={25} fontWeight={"800"}>
            with your friends
          </Typo>
          <Typo color={colors.white} size={25} fontWeight={"800"}>
            and family
          </Typo>
        </View>

        <Button
          style={{ backgroundColor: colors.white }}
          onPress={() => router.navigate("/(auth)/register")}
        >
          <Typo size={15} fontWeight={"bold"}>
            Get Started
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  welcomeImage: {
    height: verticalScale(300),
    width: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
});
