import { Dimensions, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./movieCard";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    // navigation.navigate("Movie", item);
  };

  return (
    <View className="my-5 mx-5">
      <Text className="text-white font-semibold text-xl mb-4">Trending</Text>
      {data && data.length > 0 && (
        <Carousel
          data={data}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              width={width * 0.8}
              height={400}
              handleClick={handleClick}
            />
          )}
          mode="parallax"
          width={width * 0.8}
          height={400}
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
