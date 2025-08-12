import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons, EvilIcons } from "@expo/vector-icons";
import TrendingMovies from "@/components/trendingMovies";

export default function Page() {
  const [trendingMovies, setTrendingMovies] = React.useState([1, 2, 3, 4]);
  return (
    <SafeAreaView className="flex flex-1 bg-neutral-800">
      {/* search and logo */}
      <SafeAreaView className="m-5">
        <StatusBar style="light" />
        <View className="flex flex-row justify-between items-center">
          <Octicons name="three-bars" size={24} color="white" />
          <Text className="text-white text-2xl font-bold">
            <Text className="text-yellow-400">M</Text>ovies
          </Text>
          <TouchableOpacity>
            <EvilIcons name="search" size={29} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView>
        {/* trending movies carousel */}
        <TrendingMovies data={trendingMovies} />
      </ScrollView>
    </SafeAreaView>
  );
}
