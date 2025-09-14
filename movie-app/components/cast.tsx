import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { image185 } from "@/api/moviedb";

interface ICast {
  cast: IMovieCredits;
}

const Cast: React.FC<ICast> = ({ cast: casts }) => {
  const router = useRouter();

  const cast = casts?.cast;

  const handleClick = (item: number) => {
    router.navigate({
      pathname: "/person/[id]",
      params: { id: String(item) },
    });
  };

  return (
    <View
      style={{ marginHorizontal: 20, marginVertical: 10, marginBottom: 20 }}
    >
      <Text style={{ color: "white", fontSize: 14 }}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        {cast &&
          cast?.length > 0 &&
          cast?.map((el) => (
            <TouchableOpacity
              key={el.id}
              style={{ marginHorizontal: 6 }}
              onPress={() => handleClick(el.id)}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 100,
                  overflow: "hidden",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "#c2c2c2ee",
                  justifyContent: "center",
                  marginBottom: 5,
                }}
              >
                <Image
                  alt={`person${el}`}
                  source={{ uri: image185(el?.profile_path) }}
                  style={{ width: 55, height: 55, borderRadius: 100 }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 12 }}>
                {el?.character && el?.character.length > 10
                  ? el?.character.slice(0, 10) + "..."
                  : el?.character}
              </Text>
              <Text style={{ color: "#bdbdbdee", fontSize: 12, marginTop: 1 }}>
                {el?.name && el?.name.length > 10
                  ? el?.name.slice(0, 10) + "..."
                  : el?.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
