import { View } from "react-native";
import React from "react";
import FooterButtons from "./footerButtons";
import FooterDetails from "./footerDetails";
import Comments from "./comments";

export interface IPosts {
  posts: IPost;
}

const PostFooter: React.FC<IPost> = ({ ...props }) => {
  return (
    <View>
      <FooterButtons />
      <FooterDetails {...props} />
      <Comments comments={props.comments} />
    </View>
  );
};

export default PostFooter;
