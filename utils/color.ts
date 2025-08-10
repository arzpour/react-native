import { Platform } from "react-native";

export const color = Platform.select({
  default: "black",
  web: "black",
  android: "white",
});
