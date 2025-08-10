import { Image, View } from "react-native";
import React from "react";

interface IPostImage {
  image: string;
}

const PostImage: React.FC<IPostImage> = ({ image }) => {
  return (
    <View style={{ width: "100%", height: 450 }}>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

export default PostImage;
