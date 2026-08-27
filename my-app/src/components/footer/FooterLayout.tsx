import {Link, Outlet, useLocation} from "react-router";
import {cn} from "@/utils/cn.ts";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {useTranslation} from "react-i18next";

const FooterLayout = () => {
    const {pathname} = useLocation();
    const {t} = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                <Outlet />
            </div>

            <footer className="bg-[var(--bg-card)] border-t border-[var(--border)] px-4 sm:px-6 py-5">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-[var(--text)] text-sm font-semibold">CineApp</p>
                        <p className="text-[var(--text-muted)] text-xs mt-1">
                            {t("footer.tagline")}
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center gap-2">
                        <FooterLink to={RouterEnum.ABOUT_US} active={pathname === RouterEnum.ABOUT_US}>
                            {t("footer.about_us")}
                        </FooterLink>
                        <FooterLink to={RouterEnum.COUNTACT_US} active={pathname === RouterEnum.COUNTACT_US}>
                            {t("footer.countact_us")}
                        </FooterLink>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

const FooterLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
    <Link
        to={to}
        className={cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            active
                ? "bg-violet-500 text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)]"
        )}
    >
        {children}
    </Link>
);

export default FooterLayout;
