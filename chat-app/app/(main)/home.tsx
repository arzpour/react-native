import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { testSocket } from "@/socket/socketEvents";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Home = () => {
  const { user } = useAuth();
  console.log("🚀 ~ Home ~ user:", user);
  const router = useRouter();

  React.useEffect(() => {
    testSocket(testSocketCallbackHandler);
    testSocket(null);

    return () => {
      testSocket(testSocketCallbackHandler, true);
    };
  }, []);

  const testSocketCallbackHandler = (data: any) => {
    console.log("got response from testSocket event: ", data);
  };

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4} style={{ padding: 0 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              color={colors.neutral200}
              size={15}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome back,{" "}
              <Typo color={colors.white} size={18} fontWeight={"500"}>
                {user?.name}{" "}
              </Typo>
              🤙
            </Typo>
          </View>

          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push("/(main)/profileModal")}
          >
            <Ionicons name="settings" size={17} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}></View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spacingY._25,
    paddingTop: spacingY._20,
    paddingHorizontal: spacingX._15,
  },
  settingIcon: {
    padding: spacingY._7,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: radius._50,
    borderTopLeftRadius: radius._50,
    borderCurve: "continuous",
    // paddingHorizontal: spacingX._20,
    overflow: "hidden",
  },
});
