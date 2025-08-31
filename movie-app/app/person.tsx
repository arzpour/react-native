import {
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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { themeStyles } from "@/theme";
import { useNavigation } from "expo-router";
import MovieList from "@/components/movieList";

const Person = () => {
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState([1, 2, 3]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 10,
        ...Platform.select({ android: { marginTop: 7 }, web: { margin: 20 } }),
      }}
      style={styles.container}
    >
      {/* back button */}
      <SafeAreaView style={styles.icons}>
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
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            marginVertical: 20,
            ...(Platform.OS === "web" ? { marginTop: 20 } : { marginTop: 0 }),
          }}
        >
          <View
            style={{
              shadowColor: "#dbdbdbee",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 40,
              borderRadius: 200,
              ...(Platform.OS === "android"
                ? { borderWidth: 1 }
                : { borderWidth: 2 }),
              borderColor: "#dbdbdbee",
            }}
          >
            <Image
              alt="person-image"
              source={require("../assets/images/johnwick.jpg")}
              style={{
                width: 220,
                height: 220,
                borderRadius: 200,
              }}
            />
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            Keanu Reevs
          </Text>
          <Text style={{ color: "#afafafee", fontSize: 15, marginVertical: 8 }}>
            London, United Kingdom
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#333433",
            padding: 12,
            paddingHorizontal: 20,
            marginHorizontal: 10,
            marginVertical: 10,
            marginTop: 16,
            borderRadius: 100,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white", marginBottom: 4 }}>Gender</Text>
            <Text style={{ color: "#afafafee", fontSize: 12 }}>Male</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white", marginBottom: 4 }}>Birthday</Text>
            <Text style={{ color: "#afafafee", fontSize: 12 }}>1964-09-02</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white", marginBottom: 4 }}>Known for</Text>
            <Text style={{ color: "#afafafee", fontSize: 12 }}>Acting</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white", marginBottom: 4 }}>Popularity</Text>
            <Text style={{ color: "#afafafee", fontSize: 12 }}>64.23</Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 20,
            ...Platform.select({
              android: { paddingHorizontal: 23 },
              web: { paddingHorizontal: 9 },
            }),
          }}
        >
          <Text style={styles.title}>Biography</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, dolor
            pariatur dicta tempora voluptatibus voluptatum exercitationem
            incidunt non perferendis architecto, quisquam consequatur
            consequuntur beatae sunt quae at fugit aperiam nostrum? Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Quo, dolor pariatur
            dicta tempora voluptatibus voluptatum exercitationem incidunt non
            perferendis architecto, quisquam consequatur consequuntur beatae
            sunt quae at fugit aperiam nostrum?
          </Text>
        </View>
      </View>

      {/* movies */}
      <View style={{ marginVertical: 10 }}>
        <MovieList
          data={personMovies}
          title="Movies"
          hideSeeAll={true}
          className={{
            ...Platform.select({
              android: { marginHorizontal: 23 },
              web: { marginHorizontal: 9 },
            }),
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Person;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#262626",
  },
  icons: {
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
    zIndex: 20,
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
  description: {
    color: "#bdbdbdee",
    fontSize: 14,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 15,
  },
});
