import {useQueries} from "@tanstack/react-query";
import {FilmService} from "@/services/film.service.ts";
import {SeriesService} from "@/services/series.service.ts";
import {useFavoritesQuery} from "@/hooks/useFavorites.ts";
import type {MovieDetails} from "@/types/Movie.ts";
import type {SeriesDetails} from "@/types/Series.ts";

export type FavoriteDetails =
    | ({mediaType: "movie"} & MovieDetails)
    | ({mediaType: "series"} & SeriesDetails);

export const useFavoritesDetailsQuery = () => {
    const {data: favorites = [], isLoading: isFavoritesLoading} = useFavoritesQuery();

    const results = useQueries({
        queries: favorites.map((favorite) => ({
            queryKey: ["favorite-details", favorite.type, favorite.film_id],
            queryFn: () =>
                favorite.type === "movie"
                    ? FilmService.getById(favorite.film_id).then((resp) => ({
                          mediaType: "movie" as const,
                          ...(resp.data as MovieDetails),
                      }))
                    : SeriesService.getById(favorite.film_id).then((resp) => ({
                          mediaType: "series" as const,
                          ...(resp.data as SeriesDetails),
                      })),
            enabled: Boolean(favorite.film_id),
        })),
    });

    const items = results
        .map((result) => result.data)
        .filter((item): item is FavoriteDetails => Boolean(item));

    const isLoading = isFavoritesLoading || results.some((result) => result.isLoading);

    return {items, isLoading};
};
