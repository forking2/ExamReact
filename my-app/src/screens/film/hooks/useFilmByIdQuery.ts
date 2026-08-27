import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {FilmService} from "@/services/film.service.ts";
import type { MovieDetails} from "@/types/Movie.ts";
export const useFilmByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['films', id],
        queryFn: () =>
            FilmService.getById(id)
                .then(resp => resp.data as MovieDetails),
        placeholderData: keepPreviousData
    })
}