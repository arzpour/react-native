import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme, themeStyles } from "@/theme";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "@/components/cast";
import MovieList from "@/components/movieList";
import Loading from "@/components/loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image185,
} from "@/api/moviedb";
import { useLocalSearchParams } from "expo-router/build/hooks";

const { width, height } = Dimensions.get("window");

const MovieById = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [similarMovies, setSimilarMovies] = React.useState<IMoviesRes>();
  const [movieDetails, setMovieDetails] = React.useState<IMovieDetails>();
  const [cast, setCast] = React.useState<IMovieCredits>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getMovieDetails(id as string);
    getMovieCredits(id as string);
    getSimilarMovies(id as string);
  }, [id]);

  const getMovieDetails = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      if (data) setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMovieCredits = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchMovieCredits(id);
      if (data) setCast(data);
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSimilarMovies = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchSimilarMovies(id);
      if (data) setSimilarMovies(data);
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...Platform.select({
          android: { paddingBottom: 16 },
          web: { paddingBottom: 10 },
        }),
      }}
      style={styles.container}
    >
      {/* back button and movie poster */}
      <View
        style={{
          width: "100%",
        }}
      >
        <SafeAreaView
          style={{
            padding: 20,
            ...Platform.select({
              android: {
                marginTop: 20,
              },
            }),
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            position: "absolute",
            zIndex: 20,
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
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <FontAwesome
              name="heart"
              size={24}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image185(movieDetails?.poster_path) }}
              style={{ width, height: height * 0.56 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.6)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View
        style={{
          margin: 15,
          gap: 10,
          ...Platform.select({
            android: {
              marginTop: -(height * 0.05),
            },
            web: { marginTop: -(height * 0.06) },
          }),
        }}
      >
        {/* title */}
        <Text style={styles.title}>{movieDetails?.title}</Text>

        {/* status, realese, runTime */}
        {movieDetails && (
          <View style={styles.genres}>
            <Text style={styles.genresText}>{movieDetails?.status}</Text>
            <Text style={styles.genresText}>-</Text>
            <Text style={styles.genresText}>
              {movieDetails?.release_date?.split("-")[0]}
            </Text>
            <Text style={styles.genresText}>-</Text>
            <Text style={styles.genresText}>
              {movieDetails?.runtime} min
            </Text>{" "}
          </View>
        )}

        {/* genres */}
        <View style={styles.genres}>
          {movieDetails?.genres.map((el, index) => (
            <Fragment key={el.id}>
              <Text style={styles.genresText}>{el?.name}</Text>
              <Text
                style={[
                  styles.genresText,
                  {
                    display:
                      index + 1 >= movieDetails?.genres?.length
                        ? "none"
                        : "flex",
                  },
                ]}
              >
                -
              </Text>
            </Fragment>
          ))}
        </View>

        {/* description */}
        <Text style={styles.description}>{movieDetails?.overview}</Text>
      </View>

      {cast && <Cast cast={cast} />}

      {/* similar movies */}
      {similarMovies && (
        <MovieList
          data={similarMovies}
          title="Similar Movies"
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
};

export default MovieById;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
  },
  iconContainer: {
    width: 35,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  backIcon: {
    padding: 5,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "semibold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  description: {
    color: "#bdbdbdee",
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  genresText: {
    color: "#c2c2c2ee",
    fontSize: 14,
    fontWeight: "medium",
    textAlign: "center",
    marginHorizontal: 3,
  },
});
