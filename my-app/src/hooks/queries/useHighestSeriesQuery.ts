import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {SeriesService} from "@/services/series.service.ts";
import type {SeriesResponse} from "@/types/Series.ts";

export const useHighestSeriesQuery = (page: number ) => {
    return useQuery({
        queryKey: ['topRatedSeries', page],
        queryFn: () =>
            SeriesService.getTopRated(page)
                .then(resp => resp.data as SeriesResponse),
        placeholderData: keepPreviousData
    })
}