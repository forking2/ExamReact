
import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {FilmService} from "@/services/film.service.ts";
import {useFilmQuery} from "@/screens/films/hooks/useFilmQuery.ts";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton.tsx";
import Trending from "@components/mainComps/Trending.tsx";
import HighestRated from "@components/mainComps/HighestRated.tsx";
import TopSeries from "@components/mainComps/TopSeries.tsx";

const Main = () => {
    const {data, isLoading} = useFilmQuery(1);
    const {t} = useTranslation();


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"/>
            </div>
        );
    }

    const featured = data?.results?.[0];

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">


            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">

                <div className="flex items-center justify-end gap-4 mb-6">

                    {/*<svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>*/}
                    {/*    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />*/}
                    {/*</svg>*/}
                    {/*<svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>*/}
                    {/*    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />*/}
                    {/*</svg>*/}
                    {/*<div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">U</div>*/}
                </div>

                {featured && (
                    <Link
                        to={`/movie/${featured.id}`}
                        className="relative block w-full h-64 md:h-72 rounded-2xl overflow-hidden mb-10 group"
                    >
                        <img
                            src={FilmService.getPoster(featured.backdrop_path, 'original')}
                            alt={featured.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 max-w-md">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">{featured.title}</h1>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-yellow-400 text-sm font-semibold">★ {featured.vote_average?.toFixed(1)}</span>
                                <span className="text-zinc-300 text-sm">{featured.release_date?.slice(0, 4)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-xl">
                                    {t('main.watch_now')}
                                </span>
                                <FavoriteButton
                                    className="w-9 h-9 border border-white/20"
                                    item={{
                                        id: featured.id,
                                        type: "movie",
                                        title: featured.title,
                                        poster_path: featured.poster_path,
                                        vote_average: featured.vote_average,
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                )}

                <div className="mb-10">
                    <h2 className="text-[var(--text)] text-lg font-bold mb-4">{t('main.trending')}</h2>
                    <Trending/>
                    <h2 className="text-[var(--text)] text-lg font-bold mb-4">{t('main.top_rated')}</h2>
                    <HighestRated/>
                    <h2 className="text-[var(--text)] text-lg font-bold mb-4">{t('main.top_series')}</h2>
                    <TopSeries/>
                </div>
            </main>
        </div>
    );
};
export default Main;
