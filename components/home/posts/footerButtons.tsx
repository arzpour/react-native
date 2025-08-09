import { TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

const FooterButtons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 14 }}>
        <TouchableOpacity>
          <Entypo name="heart-outlined" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="comment-o" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Feather name="bookmark" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FooterButtons;
