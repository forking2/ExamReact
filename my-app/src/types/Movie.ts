export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export type MoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type Genre = {
    id: number;
    name: string;
}

export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
}

export interface IInfo {
    count: number;
    pages: number;
    next: string;
    prev: string;
}
