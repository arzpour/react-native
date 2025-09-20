import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Header from "@/components/header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { spacingY } from "@/constants/theme";

const ProfileModal = () => {
  return (
    <ScreenWrapper isModal={true} style={{ padding: 0 }}>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={
            Platform.OS === "android" && (
              <Ionicons name="chevron-back" size={24} color="black" />
            )
          }
          style={{ marginVertical: spacingY._15 }}
        ></Header>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
});
