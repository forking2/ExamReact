export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularFilmsUrl = () => '/discover/movie';
export const getTopRatedFilmsUrl = () => '/movie/top_rated';
export const getByIdFilmUrl = (id: string) => `/movie/${id}`;
export const getPopularSeriesUrl = () => '/discover/tv';
export const getTopRatedSeriesUrl = () => '/tv/top_rated';
export const getByIdSeriesUrl = (id: string) => `/tv/${id}`;
export const getPosterUrl = () => 'https://image.tmdb.org/t/p/'

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;