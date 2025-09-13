import { Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { image500 } from "@/api/moviedb";
import { useRouter } from "expo-router";

interface IMovieCard {
  item: IMoviesResult;
  width: number;
  height: number;
}

const MovieCard = ({ item, width, height }: IMovieCard) => {
  const router = useRouter();

  const handleClick = () => {
    router.navigate(`/movie/${item.id}`);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.9,
          height: height * 0.9,
          borderRadius: 24,
          marginHorizontal: 20,
        }}
        className="rounded-xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
