import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import Loading from "@/components/loading";
import { debounce } from "lodash";
import { image185, searchMovies } from "@/api/moviedb";

const Search = () => {
  const router = useRouter();
  const [searchMovieResult, setSearchMovieResult] =
    React.useState<IMoviesRes>();
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>();

  const { height, width } = Dimensions.get("window");

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        page: 1,
        include_adult: false,
        language: "en-US",
      }).then((data) => {
        console.log(data);
        if (data && data?.results?.length > 0) setSearchMovieResult(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setSearchMovieResult(null);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={[styles.container, { padding: 20 }]}>
      <View style={styles.searchInput}>
        <TextInput
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            handleTextDebounce(text);
          }}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{ outline: "none", color: "white", width: "100%" }}
        />
        <TouchableOpacity
          onPress={() => {
            router.navigate("/");
            setSearchValue("");
            setSearchMovieResult(null);
          }}
        >
          <AntDesign name="close" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
        >
          {searchMovieResult?.results?.length > 0 && (
            <Text style={{ color: "white" }}>
              Results ({searchMovieResult?.results?.length})
            </Text>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: width <= 487 ? "flex-start" : "center",
              flexWrap: "wrap",
              marginVertical: 20,
            }}
          >
            {searchMovieResult?.results &&
            searchMovieResult?.results?.length > 0 ? (
              searchMovieResult?.results?.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    router.navigate({
                      pathname: "/movie/[id]",
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <View style={{ marginBottom: 10 }}>
                    <Image
                      source={{ uri: image185(item?.poster_path) }}
                      style={{
                        width: width * 0.393,
                        height: height * 0.3,
                        borderRadius: 20,
                      }}
                    />
                    <Text style={{ color: "white", marginVertical: 10 }}>
                      {item?.title && item?.title?.length > 10
                        ? item?.title?.slice(0, 10) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            ) : (
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Image
                  source={require("assets/images/pngtree-stay-at-home-and-watch-movie-illustration-in-hand-drawn-style-png-image_2181042-removebg-preview.png")}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#afafafee",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
});
