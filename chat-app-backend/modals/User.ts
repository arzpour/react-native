import { model, Schema } from "mongoose";
import { UserProps } from "../types";

const UserSchema = new Schema<UserProps>(
  {
    email: {
      type: String,
      required: true,
      uniqe: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserProps>("User", UserSchema);
