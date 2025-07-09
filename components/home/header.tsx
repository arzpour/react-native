import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("@/assets/images/home-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity>
          <FontAwesome name="plus" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="heart" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatBadge}>
            <Text style={styles.chatBadgeText}>10</Text>
          </View>
          <Feather name="message-circle" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginHorizontal: 20,
    marginVertical: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 20,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  chatBadge: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    zIndex: 100,
    top: -3,
    right: -4,
  },
  chatBadgeText: {
    position: "absolute",
    color: "white",
    fontSize: 9,
  },
});
