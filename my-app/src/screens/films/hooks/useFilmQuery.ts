import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useFilmFilterStore} from "@/store/useFilmFilterStore.ts";
import {FilmService} from "@/services/film.service.ts";
import type {MoviesResponse} from "@/types/Movie.ts";

export const useFilmQuery = (page: number ) => {
    const filters = useFilmFilterStore((state) => state.filters);
    return useQuery({
        queryKey: ['popularFilms', page, filters],
        queryFn: () =>
            FilmService.getFiltered(page, filters)
                .then(resp => resp.data as MoviesResponse),
        placeholderData: keepPreviousData
    })
}