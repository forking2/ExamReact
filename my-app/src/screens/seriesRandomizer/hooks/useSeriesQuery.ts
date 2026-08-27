import {useFilmFilterStore} from "@/store/useFilmFilterStore.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {SeriesService} from "@/services/series.service.ts";
import type {SeriesResponse} from "@/types/Series.ts";

export const useSeriesQuery = (page: number ) => {
    const filters = useFilmFilterStore((state) => state.filters);
    return useQuery({
        queryKey: ['popularSeries', page, filters],
        queryFn: () =>
            SeriesService.getFiltered(page, filters)
                .then(resp => resp.data as SeriesResponse),
        placeholderData: keepPreviousData
    })
}