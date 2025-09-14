import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { themeStyles } from "@/theme/index";
import { useRouter } from "expo-router";
import { image185 } from "@/api/moviedb";

const { width, height } = Dimensions.get("window");

interface IMovieList {
  title: string;
  data: IMoviesRes | IPersonMovies;
  hideSeeAll?: boolean;
  className?: ViewStyle;
}

const MovieList: React.FC<IMovieList> = ({
  title,
  data,
  hideSeeAll,
  className,
}) => {
  const router = useRouter();

  const movieData = data as IMoviesRes;
  const personMovieData = data as IPersonMovies;

  const movieList = movieData?.results || personMovieData?.cast;

  return (
    movieList?.length > 0 && (
      <View style={[styles.container, className]}>
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
          {movieList?.length > 0 &&
            movieList?.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => router.navigate(`/movie/${item?.id}`)}
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
                      source={{ uri: image185(item?.poster_path) }}
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
                        marginVertical: 4,
                        marginBottom: 20,
                      }}
                    >
                      {item?.title && item?.title.length > 10
                        ? item?.title.slice(0, 10) + "..."
                        : item?.title}{" "}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </ScrollView>
      </View>
    )
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
