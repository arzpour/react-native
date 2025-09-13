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
import React from "react";
import { useRouter } from "expo-router";
import Loading from "@/components/loading";

const Search = () => {
  const router = useRouter();
  const [results, setResults] = React.useState([1, 2, 3, 4]);
  const [loading, setLoading] = React.useState(true);

  const { height, width } = Dimensions.get("window");

  const movieName = "Keanu Reevs";

  return (
    <SafeAreaView style={[styles.container, { padding: 20 }]}>
      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{ outline: "none", color: "white" }}
        />
        <TouchableOpacity onPress={() => router.navigate("/")}>
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
          <Text style={{ color: "white" }}>
            Results ({results ?? results?.length})
          </Text>
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
            {results && results?.length > 0 ? (
              results.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => router.navigate(`/movie/${item}`)}
                >
                  <View style={{ marginBottom: 10 }}>
                    <Image
                      source={require("assets/images/00.jpg")}
                      style={{
                        width: width * 0.393,
                        height: height * 0.3,
                        borderRadius: 20,
                      }}
                    />
                    <Text style={{ color: "white", marginVertical: 10 }}>
                      {movieName && movieName.length > 10
                        ? movieName.slice(0, 10) + "..."
                        : movieName}
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
  },
});
