import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? "http://192.168.20.254:3000"
    : "http://localhost:3000";

export const CLOUDINARY_CLOUD_NAME = "dex1vcncf";
export const CLOUDINARY_UPLOAD_PRESET = "images";
