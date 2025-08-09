import { Text, View } from "react-native";
import React from "react";

interface IFooterDetails {
  likes: string;
  user: string;
  caption: string;
  comments: { user: string; comment: string }[];
}

const FooterDetails: React.FC<IFooterDetails> = ({
  likes,
  user,
  caption,
  comments,
}) => {
  return (
    <View style={{ marginHorizontal: 15, marginVertical: 7 }}>
      
      {/* likes */}
      <Text style={{ color: "white", marginBottom: 10 }}>{likes} likes</Text>

      {/* captions */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "700", marginRight: 4 }}>{user}</Text>
          <Text>{caption}</Text>
        </Text>
      </View>

      {/* comments */}
      {comments.length > 0 && (
        <Text style={{ color: "grey" }}>
          View {comments.length > 1 ? "all" : ""} {comments.length}{" "}
          {comments.length > 1 ? "comments" : "comment"}
        </Text>
      )}
    </View>
  );
};

export default FooterDetails;
