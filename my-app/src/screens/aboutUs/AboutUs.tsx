import {useTranslation} from "react-i18next";

const stats = [
    {value: "250+", labelKey: "aboutUs.stats.catalog"},
    {value: "24/7", labelKey: "aboutUs.stats.ideas"},
    {value: "React", labelKey: "aboutUs.stats.interface"},
    {value: "TMDB", labelKey: "aboutUs.stats.data"},
];

const paragraphs = ["first", "second", "third"];

const AboutUs = () => {
    const {t} = useTranslation();
    return (
        <div className="min-h-screen bg-[var(--bg)] px-4 sm:px-6 md:px-16 py-12 md:py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                        {t("aboutUs.header")}
                    </h2>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {t("aboutUs.main")}
                    </p>
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {t(`aboutUs.paragraphs.${paragraph}`)}
                        </p>
                    ))}
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-lg px-4 py-3">
                            <p className="text-[var(--text)] text-sm font-semibold">{t("aboutUs.cards.build_title")}</p>
                            <p className="text-[var(--text-muted)] text-xs leading-relaxed mt-1">
                                {t("aboutUs.cards.build_text")}
                            </p>
                        </div>
                        <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-lg px-4 py-3">
                            <p className="text-[var(--text)] text-sm font-semibold">{t("aboutUs.cards.matters_title")}</p>
                            <p className="text-[var(--text-muted)] text-xs leading-relaxed mt-1">
                                {t("aboutUs.cards.matters_text")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.labelKey}
                            className="bg-[var(--bg-card)] rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center gap-2 border border-[var(--border)] hover:shadow-sm transition-shadow"
                        >
                            <div className="text-2xl font-bold text-[var(--text)]">{stat.value}</div>
                            <div className="text-xs text-[var(--text-muted)] text-center">{t(stat.labelKey)}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
