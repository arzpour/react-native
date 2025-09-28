import { StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import { colors } from "@/constants/theme";

const Conversation = () => {
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Conversation</Typo>
    </ScreenWrapper>
  );
};

export default Conversation;

const styles = StyleSheet.create({});
