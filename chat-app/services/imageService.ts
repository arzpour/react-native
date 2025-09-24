import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import axios from "axios";

export const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (file: any, folderName: string) => {
  try {
    if (!file) return { success: true, data: null };

    const formData = new FormData();

    if (typeof file === "string" && file.startsWith("data:")) {
      formData.append("file", file);
    } else if (file.uri) {
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: file.uri.split("/").pop() ?? "file.jpg",
      } as any);
    }

    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folderName);

    const response = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: response.data.secure_url };
  } catch (error: any) {
    console.log("🚀 ~ uploadFileToCloudinary ~ error:", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};

export const getAvatarPath = (file: any, isGroup = false) => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;

  if (isGroup) return require("../assets/images/defaultGroupAvatar.png");

  return require("../assets/images/defaultAvatar.png");
};
