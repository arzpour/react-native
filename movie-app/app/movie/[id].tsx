import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme, themeStyles } from "@/theme";
import { useNavigation } from "expo-router";

const MovieById = () => {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* back button and movie poster */}
      <View
        style={{
          width: "100%",
        }}
      >
        <SafeAreaView
          style={{
            padding: 20,
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[themeStyles.background, styles.iconContainer]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color="white"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <FontAwesome
              name="heart"
              size={24}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default MovieById;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
    paddingBottom: 20,
  },
  iconContainer: {
    width: 35,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  backIcon: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    display: "flex",
    justifyContent: "center",
  },
});
