import { View } from "react-native";
import React from "react";
import PostFooter from "./posts/postFooter";
import PostHeader from "./posts/postHeader";
import PostImage from "./posts/postImage";

export interface IPosts {
  posts: IPost;
}

export const Posts: React.FC<IPosts> = ({ posts }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <PostHeader {...posts} />
      <PostImage {...posts} />
      <PostFooter {...posts} />
    </View>
  );
};
