import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/home/header";
import Stories from "@/components/home/stories";
import { Posts } from "@/components/home/posts";
import posts from "@/data/posts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ paddingTop: insets.top }}>
      <SafeAreaView style={styles.container}>
        <Header />
        <Stories />
        <ScrollView>
          {posts.map((post) => (
            <Posts key={post.profile_img} posts={post} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
