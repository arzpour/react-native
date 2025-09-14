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
import { useLocalSearchParams, useNavigation } from "expo-router";
import MovieList from "@/components/movieList";
import Loading from "@/components/loading";
import { fetchPersonDetails, fetchPersonMovies, image342 } from "@/api/moviedb";

const PersonById = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState<IPersonMovies>();
  const [personDetails, setPersonDetails] = React.useState<IPersonDetails>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getPersonDetails(id as string);
    getPersonMovies(id as string);
  }, [id]);

  const getPersonDetails = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchPersonDetails(id);
      if (data) setPersonDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPersonMovies = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchPersonMovies(id);
      if (data) setPersonMovies(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...Platform.select({
          android: { marginTop: 7, paddingBottom: 15 },
          web: { margin: 20 },
        }),
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
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <FontAwesome
            name="heart"
            size={24}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
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
                source={{ uri: image342(personDetails?.profile_path) }}
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
              {personDetails?.name}
            </Text>
            <Text
              style={{ color: "#afafafee", fontSize: 15, marginVertical: 8 }}
            >
              {personDetails?.place_of_birth}
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
              <Text style={{ color: "#afafafee", fontSize: 12 }}>
                {personDetails?.gender === 1 ? "Female" : "Male"}
              </Text>
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
              <Text style={{ color: "#afafafee", fontSize: 12 }}>
                {personDetails?.birthday}
              </Text>
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
              <Text style={{ color: "#afafafee", fontSize: 12 }}>
                {personDetails?.known_for_department}
              </Text>
            </View>
            {personDetails?.popularity && (
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "white", marginBottom: 4 }}>
                  Popularity
                </Text>
                <Text style={{ color: "#afafafee", fontSize: 12 }}>
                  {personDetails?.popularity.toFixed(2)} %
                </Text>
              </View>
            )}
          </View>

          {personDetails?.biography && (
            <View
              style={{
                marginVertical: 20,
                width: "100%",
                flex: 1,
                justifyContent: "flex-start",
                ...Platform.select({
                  android: { paddingHorizontal: 23 },
                  web: { paddingHorizontal: 9 },
                }),
              }}
            >
              <Text style={styles.title}>Biography</Text>
              <Text style={styles.description}>{personDetails?.biography}</Text>
            </View>
          )}
        </View>
      )}

      {/* movies */}
      <View
        style={{
          ...Platform.select({
            android: { marginVertical: 15 },
            web: { marginVertical: 5 },
          }),
        }}
      >
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

export default PersonById;

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
