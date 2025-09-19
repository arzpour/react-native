// import { StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";

const Home = () => {
  const { user } = useAuth();
  console.log("🚀 ~ Home ~ user:", user);
  return (
    <ScreenWrapper style={{ padding: 10 }}>
      <Typo color={colors.white}>Home</Typo>
    </ScreenWrapper>
  );
};

export default Home;

// const styles = StyleSheet.create({});
