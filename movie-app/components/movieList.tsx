import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { themeStyles } from "@/theme/index";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface IMovieList {
  title: string;
  data: number[];
  hideSeeAll?: boolean;
}

const MovieList: React.FC<IMovieList> = ({ title, data, hideSeeAll }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[themeStyles.text, { fontSize: 15 }]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5, marginTop: 16 }}
      >
        {data.map((item, index) => {
          const movieName = "movie namemooooooooooooooooo";
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => router.navigate(`/movie/${item}`)}
            >
              <View
                style={{
                  margin: 10,
                  marginLeft: 0,
                  paddingRight: 5,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/images/load.jpg")}
                  style={{
                    width: width * 0.29,
                    height: height * 0.22,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    marginVertical: 7,
                    marginBottom: 30,
                  }}
                >
                  {movieName.length > 10
                    ? movieName.slice(0, 10) + "..."
                    : movieName}{" "}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 7,
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
