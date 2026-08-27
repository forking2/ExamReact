import {useState} from "react";
import ThemeSwitcher from "@components/themeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "@components/lang-switcher/LangSwitcher.tsx";
import {Link, Outlet, useLocation} from "react-router";
import {useTranslation} from "react-i18next";
import {cn} from "@/utils/cn.ts";
import UserMenu from "@components/userMenu/UserMenu.tsx";

const HeaderLayout = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {pathname} = useLocation();
    const {t} = useTranslation();

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">

            <aside className="w-36 xl:w-56 lg:w-48 md:w-40 flex-shrink-0 bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col py-6 lg:px-4 md:px-3 px-1 sticky top-0 h-screen overflow-y-auto">

                <Link to="/" className="flex items-center gap-3 px-2 mb-8">
                    <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-violet-300">
                        🎬
                    </div>
                    <span className="text-[var(--text)] font-bold text-sm tracking-tight">CineApp</span>
                </Link>

                <nav className="flex flex-col gap-0 lg:gap-1 flex-1">
                    <SidebarLink to="/" active={pathname === '/'}>{t('sidebar.main_page')}</SidebarLink>
                    <SidebarLink to="/film_random" active={pathname === '/film_random'}>{t('sidebar.film_random')}</SidebarLink>
                    <SidebarLink to="/series_random" active={pathname === '/series_random'}>{t('sidebar.series_random')}</SidebarLink>
                    <SidebarLink to="/films" active={pathname === '/films'}>{t('sidebar.films_page')}</SidebarLink>
                    <SidebarLink to="/series" active={pathname === '/series'}>{t('sidebar.series_page')}</SidebarLink>
                    <SidebarLink to="/favorites" active={pathname === '/favorites'}>{t('sidebar.favorites')}</SidebarLink>

                    <button
                        onClick={() => setSettingsOpen(o => !o)}
                        className="flex items-center lg:gap-3 md:gap-2 sm:gap-1 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)] transition-colors mt-2"
                    >
                        {t('sidebar.settings')}
                        <span className={cn("ml-auto text-xs transition-transform", settingsOpen && "rotate-90")}>›</span>
                    </button>
                    {settingsOpen && (
                        <div className="flex flex-col lg:gap-3 md:gap-1 gap-0 lg:px-3 px-1 py-3 ml-1 lg:ml-2 border-l border-[var(--border)]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--text-muted)]">{t('sidebar.language')}</span>
                                <LangSwitcher/>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--text-muted)]">{t('sidebar.theme')}</span>
                                <ThemeSwitcher/>
                            </div>
                        </div>
                    )}
                </nav>

                <div className="mt-2 pt-3 border-t border-[var(--border)]">
                    <UserMenu/>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
};

const SidebarLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
    <Link
        to={to}
        className={cn(
            "px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            active
                ? "bg-violet-500 text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)]"
        )}
    >
        {children}
    </Link>
);

export default HeaderLayout;
