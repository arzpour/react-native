import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface IComments {
  comments: IComment[];
}

const Comments: React.FC<IComments> = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <View key={index} style={{ marginHorizontal: 15, marginVertical: 7 }}>
          <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: 600 }}>
              {comment.user} {comment.comment}
            </Text>
          </Text>
        </View>
      ))}
    </>
  );
};

export default Comments;

const styles = StyleSheet.create({});
