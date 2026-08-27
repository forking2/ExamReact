import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {FilmService} from "@/services/film.service.ts";
import {SeriesService} from "@/services/series.service.ts";
import {useFavoritesDetailsQuery} from "@/hooks/useFavoritesDetailsQuery.ts";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton.tsx";

const Favorites = () => {
    const {t} = useTranslation();
    const {items, isLoading} = useFavoritesDetailsQuery();

    return (
        <div className="min-h-screen bg-[var(--bg)] px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-[var(--text)] text-2xl font-bold mb-1">
                    {t("favorites.title")}
                </h1>
                <p className="text-[var(--text-muted)] text-sm mb-8">
                    {t("favorites.subtitle")}
                </p>

                {isLoading && (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"/>
                    </div>
                )}

                {!isLoading && items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <span className="text-5xl mb-4">♡</span>
                        <p className="text-[var(--text)] font-medium mb-1">{t("favorites.empty_title")}</p>
                        <p className="text-[var(--text-muted)] text-sm">{t("favorites.empty_subtitle")}</p>
                    </div>
                )}

                {!isLoading && items.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {items.map((item) => {
                            const isMovie = item.mediaType === "movie";
                            const title = isMovie ? item.title : item.name;
                            const year = (isMovie ? item.release_date : item.first_air_date)?.slice(0, 4);
                            const poster = isMovie
                                ? FilmService.getPoster(item.poster_path, "w300")
                                : SeriesService.getPoster(item.poster_path, "w300");
                            const link = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

                            return (
                                <Link
                                    key={`${item.mediaType}-${item.id}`}
                                    to={link}
                                    className="group relative rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-400 transition-colors"
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <img
                                            src={poster}
                                            alt={title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            ★ {item.vote_average?.toFixed(1)}
                                        </div>
                                        <FavoriteButton
                                            className="absolute top-2 left-2 w-7 h-7"
                                            item={{
                                                id: item.id,
                                                type: item.mediaType,
                                                title: title,
                                                poster_path: item.poster_path,
                                                vote_average: item.vote_average,
                                            }}
                                        />
                                    </div>
                                    <div className="p-2.5">
                                        <p className="text-[var(--text)] text-sm font-semibold truncate">{title}</p>
                                        <p className="text-[var(--text-muted)] text-xs">{year}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
