import { Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { image500 } from "@/api/moviedb";

interface IMovieCard {
  item: IMoviesResult;
  width: number;
  height: number;
  handleClick: (value: number) => void;
}

const MovieCard = ({ item, width, height, handleClick }: IMovieCard) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
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
