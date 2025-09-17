import axios from "axios";
import { API_URL } from "@/constants";
import { IError, ILoginResDto } from "@/types/types";

const login = async (
  email: string,
  password: string
): Promise<ILoginResDto> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as IError;
    const msg = err?.response?.data?.msg || "Login failed";
    throw new Error(msg);
  }
};

const register = async (
  email: string,
  password: string,
  name: string,
  avatar?: string | null
): Promise<ILoginResDto> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      name,
      avatar,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as IError;
    const msg = err?.response?.data?.msg || "Registration failed";
    throw new Error(msg);
  }
};

export { login, register };
