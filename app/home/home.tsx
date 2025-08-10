import Header from "@/components/home/header";
import { Posts } from "@/components/home/posts";
import Stories from "@/components/home/stories";
import posts from "@/data/posts";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const Home = () => {
  return (
    <ScrollView>
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
    // marginTop: 20,
    // paddingTop: 20,
    // width: "100%"
  },
});
