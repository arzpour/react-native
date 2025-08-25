import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { themeStyles } from "@/theme/index";

const MovieList = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Text style={[themeStyles.text, { fontSize: 15 }]}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
  },
});
