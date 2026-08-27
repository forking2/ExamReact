import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {SeriesService} from "@/services/series.service.ts";
import type {SeriesDetails} from "@/types/Series.ts";
export const useSeriesByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['series', id],
        queryFn: () =>
            SeriesService.getById(id)
                .then(resp => resp.data as SeriesDetails),
        placeholderData: keepPreviousData
    })
}