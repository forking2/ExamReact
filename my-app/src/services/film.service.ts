import {tmdb} from "@/services/api/interceptor.api.ts";
import {
    getByIdFilmUrl, getPopularFilmsUrl, getPosterUrl, getTopRatedFilmsUrl
} from "@/config/api.config.ts";
import {type Filters} from "@/store/useFilmFilterStore.ts";

export const FilmService = {
    getFiltered: (page: number, filters: Filters) => {
        return tmdb({
            method: "GET",
            url: getPopularFilmsUrl(),
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
            url: getTopRatedFilmsUrl(),
            params: {
                page,
            }
        })
    },
    getById:(id: string) =>

        tmdb({
            method: "GET",
            url: getByIdFilmUrl(id),
    params: {id},
    }),
    getPoster: (path: string, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500') =>
        `${getPosterUrl()}${size}${path}`,
}