import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Platform,
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
import { useRouter } from "expo-router";
import Loading from "@/components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/api/moviedb";

export default function Page() {
  const [trendingMovies, setTrendingMovies] = React.useState<IMoviesRes>();
  const [upcomingMovies, setUpcomingMovies] = React.useState<IMoviesRes>();
  const [topRatedMovies, setTopRatedMovies] = React.useState<IMoviesRes>();

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data: IMoviesRes = await fetchTrendingMovies();
    if (data && data?.results?.length > 0) {
      setTrendingMovies(data);
    }
  };

  const getUpcomingMovies = async () => {
    const data: IMoviesRes = await fetchUpcomingMovies();
    if (data && data?.results?.length > 0) {
      setUpcomingMovies(data);
    }
  };

  const getTopRatedMovies = async () => {
    const data: IMoviesRes = await fetchTopRatedMovies();
    if (data && data?.results?.length > 0) {
      setTopRatedMovies(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* search and logo */}
      <SafeAreaView
        style={{
          margin: 20,
          ...Platform.select({
            android: { marginTop: 45, marginBottom: 16 },
            web: { marginTop: 25 },
          }),
        }}
      >
        <StatusBar style="light" />
        <View style={styles.head}>
          <Octicons name="three-bars" size={24} color="white" />
          <Text style={styles.title}>
            <Text style={{ color: "yellow" }}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => router.navigate("/search")}>
            <EvilIcons name="search" size={29} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trendingMovies && trendingMovies?.results?.length > 0 && (
            <>
              {/* trending movies carousel */}
              <TrendingMovies data={trendingMovies} />
            </>
          )}

          {upcomingMovies && upcomingMovies?.results?.length > 0 && (
            <>
              {/* upcoming movies row */}
              <MovieList title="Upcoming" data={upcomingMovies} />
            </>
          )}

          {topRatedMovies && topRatedMovies?.results?.length > 0 && (
            <>
              {/* top rated movies row */}
              <MovieList title="Top Rated" data={topRatedMovies} />
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
    ...Platform.select({
      android: { paddingBottom: 16 },
    }),
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
