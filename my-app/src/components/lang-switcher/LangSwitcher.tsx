import {useTranslation} from "react-i18next";
import {cn} from "@/utils/cn.ts";

const LangSwitcher = () => {
    const { i18n, t } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }
    return (
        <div className="flex items-center gap-1 bg-[var(--bg-muted)] rounded-full p-1">
            <button
                onClick={() => changeLanguage('en')}
                disabled={i18n.language === 'en'}
                aria-label={t("language.switch_to_english")}
                className={cn(
                    "px-2 lg:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200",
                    i18n.language === 'en'
                        ? "bg-[var(--bg-card)] text-[var(--text)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('uk')}
                disabled={i18n.language === 'uk'}
                aria-label={t("language.switch_to_ukrainian")}
                className={cn(
                    "px-2 lg:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200",
                    i18n.language === 'uk'
                        ? "bg-[var(--bg-card)] text-[var(--text)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
            >
                UK
            </button>
        </div>
    );
};

export default LangSwitcher;
