import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons, EvilIcons } from "@expo/vector-icons";
import TrendingMovies from "@/components/trendingMovies";
import MovieList from "@/components/movieList";

export default function Page() {
  const [trendingMovies, setTrendingMovies] = React.useState([
    1, 2, 3, 4, 5, 6,
  ]);
  const [upcomingMovies, setUpcomingMovies] = React.useState([
    1, 2, 3, 4, 5, 6,
  ]);
  const [topRatedMovies, setTopRatedMovies] = React.useState([
    1, 2, 3, 4, 5, 6,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* search and logo */}
      <SafeAreaView style={{ margin: 20, marginTop: 35 }}>
        <StatusBar style="light" />
        <View style={styles.head}>
          <Octicons name="three-bars" size={24} color="white" />
          <Text style={styles.title}>
            <Text style={{ color: "yellow" }}>M</Text>
            ovies
          </Text>
          <TouchableOpacity>
            <EvilIcons name="search" size={29} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carousel */}
        <TrendingMovies data={trendingMovies} />

        {/* upcoming movies row */}
        <MovieList title="Upcoming" data={upcomingMovies} />

        {/* top rated movies row */}
        <MovieList title="Top Rated" data={topRatedMovies} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
