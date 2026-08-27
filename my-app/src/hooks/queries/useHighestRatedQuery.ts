import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {FilmService} from "@/services/film.service.ts";
import type {MoviesResponse} from "@/types/Movie.ts";

export const useHighestRatedQuery = (page: number ) => {
    return useQuery({
        queryKey: ['topRatedFilms', page],
        queryFn: () =>
            FilmService.getTopRated(page)
                .then(resp => resp.data as MoviesResponse),
        placeholderData: keepPreviousData
    })
}