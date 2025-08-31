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
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { theme, themeStyles } from "@/theme";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "@/components/cast";
import MovieList from "@/components/movieList";

const { width, height } = Dimensions.get("window");

const MovieById = () => {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [cast, setCast] = React.useState([1, 2, 3, 4, 5, 6]);
  const [similarMovies, setSimilarMovies] = React.useState([1, 2, 3, 4, 5, 6]);

  const movieName = "movie namemooooooooooooooooo";

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 10 }}
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
          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <FontAwesome
              name="heart"
              size={24}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("assets/images/load.jpg")}
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
        <Text style={styles.title}>{movieName}</Text>

        {/* status, realese, runTime */}
        <Text style={styles.status}>Realese - 2022 - 160 min</Text>

        {/* genres */}
        <View style={styles.genres}>
          <Text style={styles.genresText}>Action</Text>
          <Text style={styles.genresText}>-</Text>
          <Text style={styles.genresText}>Thrill</Text>
          <Text style={styles.genresText}>-</Text>
          <Text style={styles.genresText}>Comedy</Text>{" "}
        </View>

        {/* description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, dolor
          pariatur dicta tempora voluptatibus voluptatum exercitationem incidunt
          non perferendis architecto, quisquam consequatur consequuntur beatae
          sunt quae at fugit aperiam nostrum?
        </Text>
      </View>

      <Cast cast={cast} />

      {/* similar movies */}
      <MovieList
        data={similarMovies}
        title="Similar Movies"
        hideSeeAll={true}
      />
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
  status: {
    color: "#c2c2c2ee",
    fontSize: 14,
    fontWeight: "medium",
    textAlign: "center",
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
    marginHorizontal: 6,
  },
});
