import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "@/theme/index";

const MovieList = ({ title, data }) => {
  return (
    <View className="space-y-4 mx-5">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieList;
