import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const baseUrl = "https://api.themoviedb.org/3";
const trendingMovies = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = (id: string) =>
  `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id: string) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id: string) =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = (id: string) =>
  `${baseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id: string) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

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

export const fetchMovieDetails = (id: string) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id: string) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id: string) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id: string) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id: string) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
