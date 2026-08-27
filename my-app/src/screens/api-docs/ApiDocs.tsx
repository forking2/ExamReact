import {Link} from "react-router";
import {useTranslation} from "react-i18next";

const Badge = ({ method }: { method: string }) => {
    const styles: Record<string, string> = {
        GET: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
        POST: "bg-green-500/10 text-green-400 border border-green-500/30",
        PUT: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
        DELETE: "bg-red-500/10 text-red-400 border border-red-500/30",
    };

    return (
        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${styles[method] ?? "bg-[var(--bg-muted)] text-[var(--text-muted)]"}`}>
            {method}
        </span>
    );
};

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="bg-[var(--bg-muted)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs font-mono text-[var(--text)] overflow-x-auto whitespace-pre">
        {code}
    </pre>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">{title}</h2>
        {children}
    </div>
);

const Endpoint = ({
    method,
    path,
    description,
    request,
    response,
    hook,
    requestLabel,
    responseLabel
}: {
    method: string;
    path: string;
    description: string;
    request?: string;
    response: string;
    hook?: string;
    requestLabel: string;
    responseLabel: string;
}) => (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
            <Badge method={method} />
            <code className="text-sm font-mono text-[var(--text)] break-all">{path}</code>
            {hook && (
                <span className="sm:ml-auto text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded w-fit">
                    {hook}
                </span>
            )}
        </div>
        <div className="px-5 py-4 space-y-3">
            <p className="text-sm text-[var(--text-muted)]">{description}</p>
            {request && (
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">{requestLabel}</p>
                    <CodeBlock code={request} />
                </div>
            )}
            <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">{responseLabel}</p>
                <CodeBlock code={response} />
            </div>
        </div>
    </div>
);

const FilmApiDocs = () => {
    const {t} = useTranslation();
    const hookDocs = [
        {
            name: "useFilmQuery(page)",
            desc: t("apiDocs.hooks.film_query"),
            returns: "{ data: MoviesResponse, isLoading, error }",
        },
        {
            name: "useFilmByIdQuery(id)",
            desc: t("apiDocs.hooks.film_by_id"),
            returns: "{ data: MovieDetails, isLoading, error }",
        },
    ];
    const errors = [
        {code: "401", desc: t("apiDocs.errors.401")},
        {code: "404", desc: t("apiDocs.errors.404")},
        {code: "429", desc: t("apiDocs.errors.429")},
        {code: "500", desc: t("apiDocs.errors.500")},
    ];

    return (
        <div className="min-h-screen bg-[var(--bg)] px-4 sm:px-6 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="mb-10">
                    <Link to="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6 inline-block">
                        ← {t("apiDocs.back")}
                    </Link>

                    <h1 className="text-2xl font-semibold text-[var(--text)]">{t("apiDocs.header")}</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{t("apiDocs.subtitle")}</p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{t("apiDocs.description")}</p>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">{t("apiDocs.base_url")}</span>
                        <code className="text-xs font-mono bg-[var(--bg-card)] border border-[var(--border)] px-2.5 py-1 rounded-lg text-[var(--text)] overflow-x-auto">
                            https://api.themoviedb.org/3
                        </code>
                    </div>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">{t("apiDocs.auth")}</span>
                        <code className="text-xs font-mono bg-[var(--bg-card)] border border-[var(--border)] px-2.5 py-1 rounded-lg text-[var(--text)] overflow-x-auto">
                            ?api_key=VITE_TMDB_API_KEY
                        </code>
                    </div>
                </div>

                <Section title={t("apiDocs.sections.types")}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden mb-4">
                        <div className="px-5 py-3 border-b border-[var(--border)]">
                            <span className="text-xs font-mono font-semibold text-[var(--text)]">Movie</span>
                        </div>
                        <div className="px-5 py-4">
                            <CodeBlock code={`{
  id:            number
  title:         string
  overview:      string
  poster_path:   string
  backdrop_path: string
  release_date:  string
  vote_average:  number
  genre_ids:     number[]
}`} />
                        </div>
                    </div>
                </Section>

                <Section title={t("apiDocs.sections.endpoints")}>
                    <Endpoint
                        method="GET"
                        path="/discover/movie"
                        description={t("apiDocs.endpoints.discover")}
                        hook="FilmService.getFiltered(page, filters)"
                        requestLabel={t("apiDocs.query_params")}
                        responseLabel={t("apiDocs.response")}
                        request={`{
  page:                number
  with_genres?:        number
  "vote_average.gte"?: number
}`}
                        response="MoviesResponse"
                    />
                    <Endpoint
                        method="GET"
                        path="/movie/:id"
                        description={t("apiDocs.endpoints.details")}
                        hook="useFilmByIdQuery(id)"
                        requestLabel={t("apiDocs.query_params")}
                        responseLabel={t("apiDocs.response")}
                        response="MovieDetails"
                    />
                </Section>

                <Section title={t("apiDocs.sections.hooks")}>
                    {hookDocs.map(({name, desc, returns}) => (
                        <div key={name} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-5 py-4 mb-4">
                            <code className="text-sm font-mono font-semibold text-violet-400 break-all">{name}</code>
                            <p className="text-sm text-[var(--text-muted)] mt-1.5 mb-3">{desc}</p>
                            <CodeBlock code={`returns: ${returns}`} />
                        </div>
                    ))}
                </Section>

                <Section title={t("apiDocs.sections.helpers")}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-5 py-4 mb-4">
                        <code className="text-sm font-mono font-semibold text-violet-400 break-all">FilmService.getPoster(path, size)</code>
                        <p className="text-sm text-[var(--text-muted)] mt-1.5 mb-3">
                            {t("apiDocs.helpers.poster")} <code className="text-xs font-mono bg-[var(--bg-muted)] px-1 py-0.5 rounded">w200 | w300 | w500 | original</code>.
                        </p>
                        <CodeBlock code={`returns: string
example: https://image.tmdb.org/t/p/w500/abc123.jpg`} />
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-5 py-4">
                        <code className="text-sm font-mono font-semibold text-violet-400">useGenres()</code>
                        <p className="text-sm text-[var(--text-muted)] mt-1.5 mb-3">{t("apiDocs.helpers.genres")}</p>
                        <CodeBlock code="returns: { id: number; name: string }[]" />
                    </div>
                </Section>

                <Section title={t("apiDocs.sections.errors")}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-5 py-4 space-y-3">
                        <p className="text-sm text-[var(--text-muted)]">
                            {t("apiDocs.errors_intro")} <code className="text-xs font-mono bg-[var(--bg-muted)] px-1 py-0.5 rounded">error.response.data</code> {t("apiDocs.or")} <code className="text-xs font-mono bg-[var(--bg-muted)] px-1 py-0.5 rounded">error.message</code>.
                        </p>
                        <div className="space-y-2">
                            {errors.map(({code, desc}) => (
                                <div key={code} className="flex items-start gap-3">
                                    <span className="text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded shrink-0">
                                        {code}
                                    </span>
                                    <span className="text-xs text-[var(--text-muted)]">{desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default FilmApiDocs;
