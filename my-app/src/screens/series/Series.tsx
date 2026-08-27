import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {useFilmFilterStore} from "@/store/useFilmFilterStore.ts";
import {useSeriesQuery} from "@/screens/series/hooks/useSeriesQuery.ts";
import {SeriesService} from "@/services/series.service.ts";
import {useGenres} from "@/screens/series/hooks/useGenres.ts";
import Pagination from "@components/pagination/Pagination.tsx";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton.tsx";


const Series = () => {
    const {filters, setFilters, resetFilters} = useFilmFilterStore();
    const {data, isLoading} = useSeriesQuery(Number(filters.page));
    const genres = useGenres();
    const {t} = useTranslation();

    const currentPage = Number(filters.page) || 1;
    const totalPages = Number(data?.total_pages) || 1;

    const getGenreNames = (ids: number[]) =>
        ids
            .map(id => genres.find(g => g.id === id)?.name)
            .filter(Boolean)
            .slice(0, 4);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-2 bg-[var(--bg-muted)] rounded-xl px-3 py-2 flex-1 min-w-28">
                    <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder={t('main.title_filter')}
                        value={filters.title}
                        onChange={(e) => setFilters('title', e.target.value)}
                        className="bg-transparent text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none w-full"
                    />
                </div>
                <div className="flex items-center gap-2 bg-[var(--bg-muted)] rounded-xl px-3 py-2 flex-1 min-w-28">
                    <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zM21 21l-4.5-4.5" />
                    </svg>
                    <input
                        type="text"
                        placeholder={t('main.vote_average_filter')}
                        value={filters.vote_average}
                        onChange={(e) => setFilters('vote_average', e.target.value)}
                        className="bg-transparent text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none w-full"
                    />
                </div>
                <select
                    value={filters.genre_id}
                    onChange={(e) => setFilters('genre_id', e.target.value)}
                    className="bg-[var(--bg-muted)] text-[var(--text)] text-xs rounded-xl px-3 py-2 outline-none"
                >
                    <option value="">{t('main.all_genres_filters')}</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 bg-[var(--bg-muted)] hover:bg-red-100 hover:text-red-500 text-[var(--text-muted)] text-xs font-medium px-3 py-2 rounded-xl transition-colors duration-200 active:scale-95"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('main.reset_button')}
                </button>
            </div>

            <div className="max-w-7xl mx-auto">

                <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-6 tracking-tight">
                    {t('series.header')}
                </h1>

                {data && data.results.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {data.results.map((series) => (
                                <Link
                                    key={series.id}
                                    to={`/tv/${series.id}`}
                                    className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden bg-[var(--bg-muted)]">
                                        <img
                                            src={SeriesService.getPoster(series.poster_path)}
                                            alt={series.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                            ★ {series.vote_average.toFixed(1)}
                                        </div>
                                        <FavoriteButton
                                            className="absolute top-2 left-2 w-8 h-8"
                                            item={{
                                                id: series.id,
                                                type: "series",
                                                title: series.name,
                                                poster_path: series.poster_path,
                                                vote_average: series.vote_average,
                                            }}
                                        />
                                    </div>

                                    <div className="p-3 flex flex-col gap-1">
                                        <p className="text-[var(--text)] text-sm font-semibold leading-tight line-clamp-2">
                                            {series.name}
                                        </p>
                                        <p className="text-[var(--text-muted)] text-xs">
                                            {series.first_air_date?.slice(0, 4)}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {getGenreNames(series.genre_ids).map(name => (
                                                <span
                                                    key={name}
                                                    className="bg-violet-500/10 text-violet-400 text-[10px] font-medium px-2 py-0.5 rounded-full"
                                                >
                                                {name}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setFilters("page", String(page))}
                            siblingCount={1}/>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-[var(--text-muted)]">
                        <span className="text-5xl mb-4">🎬</span>
                        <p className="text-lg font-medium">{t("empty.no_series")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Series;
