import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {useAuthQuery} from "@/screens/auth/hooks/useAuthQuery.ts";
import {useLogoutMutation} from "@/screens/auth/hooks/useAuthMutation.ts";
import {useOnClickOutside} from "@/hooks/useOnClickOutside.ts";

const UserMenu = () => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const {data: user, isLoading} = useAuthQuery();
    const logoutMutation = useLogoutMutation();

    useOnClickOutside(menuRef, () => setOpen(false));

    const login = user?.user_metadata?.login;
    const email = user?.email;
    const initial = (login ?? email ?? "?").charAt(0).toUpperCase();

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-muted)] animate-pulse" />
            </div>
        );
    }

    if (!user) {
        return (
            <Link
                to={RouterEnum.LOGIN}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors"
            >
                {t("auth.login.submit")}
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            {open && (
                <div className="absolute bottom-full left-0 mb-2 w-full min-w-44 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-20 animate-fade-in">
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                            logoutMutation.mutate();
                        }}
                        disabled={logoutMutation.isPending}
                        className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-60"
                    >
                        {logoutMutation.isPending ? t("user_menu.logging_out") : t("user_menu.logout")}
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
            >
                <span className="w-9 h-9 flex-shrink-0 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    {initial}
                </span>
                <span className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-xs font-semibold text-[var(--text)] truncate w-full text-left" title={login ?? undefined}>
                        {login ?? t("user_menu.account")}
                    </span>
                    {email && (
                        <span className="text-[10px] text-[var(--text-muted)] truncate w-full text-left" title={email}>
                            {email}
                        </span>
                    )}
                </span>
                <span className={`flex-shrink-0 text-xs text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}>
                    ⌃
                </span>
            </button>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(4px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.15s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UserMenu;
