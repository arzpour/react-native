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

interface ICast {
  cast: number[];
}

const Cast: React.FC<ICast> = ({ cast }) => {
  const personName = "Keanu Reevs";
  const characterName = "John wick";

  const router = useRouter();

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
        {cast.length > 0 &&
          cast.map((el) => (
            <TouchableOpacity
              key={el}
              style={{ marginHorizontal: 6 }}
              onPress={() => router.navigate(`/person`)}
            >
              <View
                style={{
                  width: 55,
                  height: 55,
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
                  source={require("../assets/images/johnwick.jpg")}
                  style={{ width: 55, height: 55, borderRadius: 100 }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 12 }}>
                {characterName.length > 10
                  ? characterName.slice(0, 10) + "..."
                  : characterName}
              </Text>
              <Text style={{ color: "#bdbdbdee", fontSize: 12, marginTop: 1 }}>
                {personName.length > 10
                  ? personName.slice(0, 10) + "..."
                  : personName}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
