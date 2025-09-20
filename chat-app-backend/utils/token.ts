import { UserProps } from "../types";
import jwt from "jsonwebtoken";

export const generateToken = (user: UserProps) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
