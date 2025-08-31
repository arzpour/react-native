import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./movieCard";
import { useNavigation, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const router = useRouter();

  const handleClick = (item: string) => {
    router.navigate(`/movie/${item}`);
  };

  const pictureWidth = Platform.select({
    web: width * 0.8,
    android: width * 0.85,
  });

  return (
    <View style={{ margin: 20 }}>
      <Text style={styles.title}>Trending</Text>
      {data && data.length > 0 && (
        <Carousel
          data={data}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              width={width * 0.8}
              height={470}
              handleClick={handleClick}
            />
          )}
          mode="parallax"
          width={pictureWidth}
          height={410}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </View>
  );
};

export default TrendingMovies;

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
    fontSize: 15,
    fontWeight: "semibold",
    marginBottom: 3,
  },
});
