import { Image, TouchableWithoutFeedback } from "react-native";
import React from "react";

const MovieCard = ({ item, width, height, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require("../assets/images/00.jpg")}
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
