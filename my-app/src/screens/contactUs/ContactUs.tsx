import {useTranslation} from "react-i18next";

const ContactUs = () => {
    const {t} = useTranslation();

    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col px-4 sm:px-6 md:px-16 py-12 md:py-16">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center flex-1">

                <div className="rounded-xl overflow-hidden border border-[var(--border)] h-64 sm:h-80 lg:h-full">
                    <img
                        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80"
                        alt={t("contactUs.image_alt")}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6 md:gap-8">
                    <h2 className="text-[var(--text)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        {t("contactUs.header")}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-orange-400 font-semibold text-sm">{t("contactUs.visit_us")}</span>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                Verbytskogo, 22<br />
                                Ternopil, Ukraine<br />
                                46020
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-orange-400 font-semibold text-sm">{t("contactUs.contact")}</span>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                (096) 903 8772
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContactUs;
