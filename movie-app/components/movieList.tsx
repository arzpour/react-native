import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { themeStyles } from "@/theme/index";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Text style={[themeStyles.text, { fontSize: 15 }]}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        {data.map((item, index) => {
          const text = "movie namemooooooooooooooooo";
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => router.navigate(`/movie/${item}`)}
            >
              <View style={{ margin: 20, justifyContent: "center" }}>
                <Image
                  source={require("../assets/images/home-logo.png")}
                  style={{
                    width: width * 0.29,
                    height: height * 0.22,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ color: "white", marginVertical: 20 }}>
                  {text.length > 10 ? text.slice(0, 10) + "..." : text}{" "}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
  },
});
