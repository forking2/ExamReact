export type Series = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    genre_ids: number[];
}

export type SeriesResponse = {
    page: number;
    results: Series[];
    total_pages: number;
    total_results: number;
}

export type Genre = {
    id: number;
    name: string;
}

export type SeriesDetails = {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    backdrop_path: string;
    vote_average: number;
    genres: Genre[];
}

export interface IInfo {
    count: number;
    pages: number;
    next: string;
    prev: string;
}
