import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface IPostHeader {
  profile_img: string;
  user: string;
}

const PostHeader: React.FC<IPostHeader> = ({ profile_img, user }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <Image source={{ uri: profile_img }} style={styles.user} />
        <Text style={{ color: "white", fontWeight: "600" }}>{user}</Text>
      </View>
      <Text style={{ color: "white", fontWeight: "900", marginRight: 20 }}>
        ...
      </Text>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  user: {
    width: 45,
    height: 45,
    borderRadius: 50,
    margin: 8,
    borderWidth: 3,
    borderColor: "tomato",
  },
});
