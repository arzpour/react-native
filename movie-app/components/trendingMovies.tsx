import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./movieCard";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface ITrendingMovies {
  data: IMoviesRes;
}

const TrendingMovies = ({ data }: ITrendingMovies) => {
  const router = useRouter();

  const pictureWidth = Platform.select({
    web: width * 0.8,
    android: width * 0.85,
  });

  return (
    <View style={{ margin: 20 }}>
      <Text style={styles.title}>Trending</Text>
      {data?.results?.length > 0 && (
        <Carousel
          data={data.results}
          renderItem={({ item }) => (
            <MovieCard item={item} width={width * 0.8} height={470} />
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
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "semibold",
  },
});
