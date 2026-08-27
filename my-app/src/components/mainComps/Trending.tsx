import {useFilmQuery} from "@/screens/films/hooks/useFilmQuery.ts";
import {useGenres} from "@/screens/films/hooks/useGenres.ts";
import {Link} from "react-router";
import {FilmService} from "@/services/film.service.ts";
import FavoriteButton from "@components/favoriteButton/FavoriteButton.tsx";

const Trending = () => {
    const {data, isLoading} = useFilmQuery(1);
    const genres = useGenres();

    const getGenreNames = (ids: number[]) =>
        ids.map(id => genres.find(g => g.id === id)?.name).filter(Boolean).slice(0, 2);

    const trending = data?.results?.slice(1) ?? [];
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"/>
            </div>
        );
    }


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pb-2">
            {trending.slice(0, 10).map((film) => (
                <Link
                    key={film.id}
                    to={`/movie/${film.id}`}
                    className="group w-full flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                    <div className="relative aspect-[2/3] overflow-hidden bg-[var(--bg-muted)]">
                        <img
                            src={FilmService.getPoster(film.poster_path)}
                            alt={film.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            ★ {film.vote_average.toFixed(1)}
                        </div>
                        <FavoriteButton
                            className="absolute top-2 left-2 w-7 h-7"
                            item={{
                                id: film.id,
                                type: "movie",
                                title: film.title,
                                poster_path: film.poster_path,
                                vote_average: film.vote_average,
                            }}
                        />
                    </div>
                    <div className="p-2.5 flex flex-col gap-1">
                        <p className="text-[var(--text)] text-xs font-semibold leading-tight line-clamp-2">{film.title}</p>
                        <p className="text-[var(--text-muted)] text-[10px]">{film.release_date?.slice(0, 4)}</p>
                        <div className="flex flex-wrap gap-1">
                            {getGenreNames(film.genre_ids).map(name => (
                                <span key={name} className="bg-violet-500/10 text-violet-400 text-[9px] font-medium px-1.5 py-0.5 rounded-full">
                                                {name}
                                            </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    );
};

export default Trending;