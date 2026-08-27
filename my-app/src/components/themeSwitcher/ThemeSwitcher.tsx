import {useTheme} from "@/providers/ThemeContextProvider.tsx";
import {cn} from "@/utils/cn.ts";
import {useTranslation} from "react-i18next";

const ThemeSwitcher = () => {
    const {theme, toggleTheme} = useTheme()
    const {t} = useTranslation();

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            title={t("theme.toggle")}
            className={cn(
                "relative flex items-center w-14 h-7 rounded-full border transition-colors duration-300",
                isDark
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-zinc-200 border-zinc-300"
            )}
        >
            <span className="absolute left-1.5 text-xs">☀️</span>
            <span className="absolute right-1.5 text-xs">🌙</span>

            <span className={cn(
                "absolute w-5 h-5 rounded-full shadow-sm transition-all duration-300",
                isDark
                    ? "translate-x-7 bg-zinc-900"
                    : "translate-x-1 bg-white"
            )} />
        </button>
    );
};

export default ThemeSwitcher;
