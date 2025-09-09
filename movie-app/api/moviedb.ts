import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const baseUrl = "https://api.themoviedb.org/3";
const trendingMovies = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params?: {}) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ?? {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMovies);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMovies);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovies);
};
