import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://api.themoviedb.org/3";
export const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const API_KEY = process.env.REACT_APP_API_KEY;

const config: AxiosRequestConfig = {
  baseURL,
  params: { api_key: API_KEY, language: "en-US" },
};

export const httpClient = axios.create(config);

export const endpoints = {
  trending: "/trending/all/week",
  netflixOriginals: "/discover/tv?with_network=213",
  topRated: "/movie/top_rated",
  actionMovies: "/discover/movie?with_genres=28",
  comedyMovies: "/discover/movie?with_genres=35",
  horrorMovies: "/discover/movie?with_genres=27",
  romanceMovies: "/discover/movie?with_genres=10749",
  docMovies: "/discover/movie?with_genres=99",
};
