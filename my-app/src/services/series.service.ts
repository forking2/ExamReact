import type {Filters} from "@/store/useFilmFilterStore.ts";
import {
    getByIdSeriesUrl,
    getPopularSeriesUrl,
    getPosterUrl,
    getTopRatedSeriesUrl
} from "@/config/api.config.ts";
import tmdb from "@/services/api/interceptor.api.ts";

export const SeriesService = {
    getFiltered: (page: number, filters: Filters) => {
        return tmdb({
            method: "GET",
            url: getPopularSeriesUrl(),
            params: {
                page,
                with_text_query: filters.title || undefined,
                with_genres: filters.genre_id || undefined,
                'vote_average.gte': filters.vote_average || undefined,
            }
        })
    },
    getTopRated: (page: number) => {
        return tmdb({
            method: "GET",
            url: getTopRatedSeriesUrl(),
            params: {
                page,
            }
        })
    },
    getById:(id: string) =>

        tmdb({
            method: "GET",
            url: getByIdSeriesUrl(id),
            params: {id},
        }),
    getPoster: (path: string, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500') =>
        `${getPosterUrl()}${size}${path}`,
}