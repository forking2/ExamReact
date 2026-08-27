import {useFilmByIdQuery} from "@/screens/film/hooks/useFilmByIdQuery.ts";
import {useParams, Link} from "react-router";
import {FilmService} from "@/services/film.service.ts";
import {useTranslation} from "react-i18next";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton.tsx";

const Film = () => {
    const { id } = useParams<{ id: string }>();
    const {data, isLoading} = useFilmByIdQuery(id!);
    const {t} = useTranslation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"/>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text-muted)]">
                <span className="text-5xl mb-4"></span>
                <p className="text-lg font-medium">{t("details.film_not_found")}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg)]">

            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                <img
                    src={FilmService.getPoster(data.backdrop_path, 'original')}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" />

                <Link
                    to="/films"
                    className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full hover:bg-black/70 transition-colors"
                >
                    ← {t("project.back")}
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-24 relative z-10 pb-12">
                <div className="flex flex-col md:flex-row gap-6">

                    <img
                        src={FilmService.getPoster(data.poster_path, 'w300')}
                        alt={data.title}
                        className="w-40 md:w-52 rounded-2xl shadow-xl border border-[var(--border)] flex-shrink-0 self-start"
                    />

                    <div className="flex flex-col gap-4 pt-2 md:pt-20">

                        <div>
                            <h1 className="text-[var(--text)] text-2xl md:text-3xl font-bold leading-tight">
                                {data.title}
                            </h1>
                            <p className="text-[var(--text-muted)] text-sm mt-1">
                                {data.release_date?.slice(0, 4)}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-3 py-1.5">
                                <span className="text-yellow-400">★</span>
                                <span className="text-[var(--text)] text-sm font-semibold">{data.vote_average?.toFixed(1)}</span>
                            </div>
                            <FavoriteButton
                                variant="solid"
                                className="w-9 h-9"
                                item={{
                                    id: data.id,
                                    type: "movie",
                                    title: data.title,
                                    poster_path: data.poster_path,
                                    vote_average: data.vote_average,
                                }}
                            />
                        </div>

                        {data.genres && data.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {data.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="bg-violet-500/10 text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-500/20"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-[var(--text)] text-lg font-semibold mb-2">{t("details.overview")}</h2>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {data.overview || t("details.no_overview")}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Film;
