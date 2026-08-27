import {useState, useEffect} from "react";
import {Link} from "react-router";
import {useFilmQuery} from "@/screens/randomizer/hooks/useFilmQuery.ts";
import {FilmService} from "@/services/film.service.ts";
import {useFilmFilterStore} from "@/store/useFilmFilterStore.ts";
import {useTranslation} from "react-i18next";

const FilmRandomizer = () => {
    const [randomPage, setRandomPage] = useState(1);
    const [isSpinning, setIsSpinning] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [picked, setPicked] = useState<null | { id: number; title: string; poster_path: string; vote_average: number }>(null);

    const {filters, setFilters, resetFilters} = useFilmFilterStore();
    const {data, isLoading} = useFilmQuery(randomPage);
    const {t} = useTranslation();
    const TOTAL_PAGES = 500;

    const handleSpin = () => {
        setIsSpinning(true);
        setPicked(null);
        const newPage = Math.floor(Math.random() * TOTAL_PAGES) + 1;
        setRandomPage(newPage);
    };

    useEffect(() => {
        resetFilters();
    }, []);

    useEffect(() => {
        if (isSpinning && data && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const film = data.results[randomIndex];
            const t = setTimeout(() => {
                setPicked(film);
                setIsSpinning(false);
            }, 1400);
            return () => clearTimeout(t);
        }
    }, [data, isSpinning]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, var(--bg), var(--bg-muted))' }}>
            <div className="w-full max-w-sm bg-[var(--bg-card)]/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-[var(--border)] px-4 sm:px-7 pt-6 pb-7 flex flex-col items-center gap-1">

                <div className="w-full flex justify-end mb-4">
                </div>

                <div className="w-24 h-24 [perspective:700px] flex items-center justify-center mb-1">
                    <div className={`relative w-14 h-14 [transform-style:preserve-3d] ${isSpinning ? 'animate-cube-spin' : 'animate-cube-idle'}`}>
                        <CubeFace transform="rotateY(0deg) translateZ(28px)" icon="🎬" />
                        <CubeFace transform="rotateY(90deg) translateZ(28px)" icon="🍿" />
                        <CubeFace transform="rotateY(180deg) translateZ(28px)" icon="🎞️" />
                        <CubeFace transform="rotateY(-90deg) translateZ(28px)" icon="🎟️" />
                        <CubeFace transform="rotateX(90deg) translateZ(28px)" icon="⭐" />
                        <CubeFace transform="rotateX(-90deg) translateZ(28px)" icon="🎭" />
                    </div>
                </div>

                <h1 className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent text-lg sm:text-xl font-bold text-center">
                    {t("film_randomizer.header")}
                </h1>
                <p className="text-[var(--text-muted)] text-sm text-center mt-1 mb-6">
                    {t("film_randomizer.caption")}
                </p>

                {picked && !isSpinning && (
                    <Link
                        to={`/movie/${picked.id}`}
                        className="w-full bg-[var(--bg-muted)] rounded-2xl shadow-sm border border-[var(--border)] flex gap-4 p-4 mb-5 animate-fade-in hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                        <img
                            src={FilmService.getPoster(picked.poster_path, 'w200')}
                            alt={picked.title}
                            className="w-16 h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex flex-col justify-center gap-1 min-w-0">
                            <p className="text-[var(--text)] font-semibold text-sm leading-tight line-clamp-2">
                                {picked.title}
                            </p>
                            <div className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
                                ★ {picked.vote_average?.toFixed(1)}
                            </div>
                            <span className="text-violet-500 text-xs font-medium mt-1">{t('film_randomizer.view_detail')} →</span>
                        </div>
                    </Link>
                )}

                {filtersOpen && (
                    <div className="w-full flex flex-col gap-2 mb-4 animate-fade-in">
                        <input
                            type="text"
                            placeholder={t('main.vote_average_filter')}
                            value={filters.vote_average}
                            onChange={(e) => setFilters('vote_average', e.target.value)}
                            className="w-full bg-[var(--bg-muted)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-violet-400 transition-colors"
                        />
                        <button
                            onClick={resetFilters}
                            className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors self-end"
                        >
                            {t('main.reset_button')}
                        </button>
                    </div>
                )}

                <button
                    onClick={handleSpin}
                    disabled={isSpinning || isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 text-white text-sm font-semibold py-3.5 rounded-2xl shadow-lg shadow-pink-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className={isSpinning ? "animate-spin-slow inline-block" : "inline-block"}>🔀</span>
                    {isSpinning ? t("film_randomizer.button_rolling") : t("film_randomizer.button")}
                </button>

                <button
                    onClick={() => setFiltersOpen(o => !o)}
                    className="w-full mt-2.5 bg-[var(--bg-muted)] border border-[var(--border)] text-[var(--text)] text-sm font-medium py-3 rounded-2xl hover:bg-[var(--border)] transition-colors"
                >
                    {t('main.filters')}
                </button>

            </div>

            <style>{`
                @keyframes cube-spin {
                    from { transform: rotateX(0deg) rotateY(0deg) scale(1); }
                    50%  { transform: rotateX(360deg) rotateY(540deg) scale(1.15); }
                    to   { transform: rotateX(720deg) rotateY(1080deg) scale(1); }
                }
                .animate-cube-spin {
                    animation: cube-spin 1.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes cube-idle {
                    from { transform: rotateX(0deg) rotateY(0deg); }
                    to   { transform: rotateX(360deg) rotateY(360deg); }
                }
                .animate-cube-idle {
                    animation: cube-idle 18s linear infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 0.8s linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

const CubeFace = ({ transform, icon }: { transform: string; icon: string }) => (
    <div
        className="absolute inset-0 w-14 h-14 rounded-xl border-2 border-white/60 flex items-center justify-center shadow-lg"
        style={{
            transform,
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
        }}
    >
        <span className="text-lg drop-shadow">{icon}</span>
    </div>
);

export default FilmRandomizer;
