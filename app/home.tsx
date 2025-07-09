import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/home/header";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
