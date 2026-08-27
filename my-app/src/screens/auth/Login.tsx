import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {useLoginMutation} from "@/screens/auth/hooks/useAuthMutation.ts";
import {loginSchema, type LoginFormValues} from "@/screens/auth/schemas/auth.schema.ts";

const Login = () => {
    const {t} = useTranslation();
    const loginMutation = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {login: "", password: ""},
        mode: "onBlur",
    });

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate({data});
    };

    return (
        <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
            <section className="w-full max-w-5xl min-h-[640px] bg-[var(--bg-card)] border border-[var(--border)] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative px-6 py-8 sm:px-10 lg:px-20 flex items-center justify-center bg-[var(--bg-card)]">
                    <div className="w-full max-w-sm relative z-10">
                        <p className="text-xs text-[var(--text-muted)] mb-16">{t("auth.login.page")}</p>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                            <h1 className="text-center text-sm font-bold text-[var(--text)] mb-2">
                                {t("auth.login.welcome")}
                            </h1>

                            <label className="flex flex-col gap-2 text-xs font-medium text-[var(--text)]">
                                {t("auth.fields.login")}
                                <input
                                    type="text"
                                    autoComplete="username"
                                    {...register("login")}
                                    className="h-10 rounded-full border border-violet-400 bg-transparent px-4 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                                />
                                {errors.login && (
                                    <span className="text-[11px] text-red-500">{t(errors.login.message as string)}</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-2 text-xs font-medium text-[var(--text)]">
                                {t("auth.fields.password")}
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                    className="h-10 rounded-full border border-violet-400 bg-transparent px-4 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                                />
                                {errors.password && (
                                    <span className="text-[11px] text-red-500">{t(errors.password.message as string)}</span>
                                )}
                            </label>

                            {loginMutation.isError && (
                                <p className="text-xs text-red-500 text-center">{t("auth.errors.login_failed")}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="mt-3 h-10 rounded-full bg-violet-500 text-white text-sm font-semibold transition hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loginMutation.isPending ? t("auth.login.loading") : t("auth.login.submit")}
                            </button>
                        </form>

                        <div className="mt-10 text-center text-xs text-[var(--text)]">
                            {t("auth.login.no_account")}{" "}
                            <Link to={RouterEnum.REGISTER} className="font-semibold hover:text-violet-500 transition">
                                {t("auth.login.register_link")}
                            </Link>
                        </div>

                        <SocialLinks />
                    </div>

                    <div className="absolute -left-16 -bottom-20 h-44 w-44 rounded-[3rem] rotate-45 bg-violet-400/30 border-[10px] border-violet-500/40" />
                </div>

                <div className="hidden lg:flex relative items-center justify-center bg-violet-300/70 dark:bg-violet-900/40 overflow-hidden">
                    <LaptopIllustration />
                </div>
            </section>
        </main>
    );
};

const SocialLinks = () => (
    <div className="mt-6 flex items-center justify-center gap-2">
        {["f", "w", "t"].map((item) => (
            <span
                key={item}
                className="h-6 w-6 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center"
            >
                {item}
            </span>
        ))}
    </div>
);

const LaptopIllustration = () => (
    <div className="relative h-72 w-80">
        <div className="absolute left-7 top-24 h-32 w-56 -rotate-12 rounded-xl bg-indigo-950 shadow-2xl dark:bg-indigo-800" />
        <div className="absolute left-28 top-36 h-20 w-52 rotate-[-12deg] rounded-b-3xl bg-zinc-200 shadow-xl dark:bg-zinc-300" />
        <div className="absolute left-40 top-44 grid grid-cols-6 gap-1 rotate-[-12deg]">
            {Array.from({length: 24}).map((_, index) => (
                <span key={index} className="h-2 w-4 rounded-sm bg-sky-900/30" />
            ))}
        </div>
        <div className="absolute left-4 top-32 h-2 w-16 -rotate-12 rounded-full bg-amber-300" />
        <div className="absolute left-2 top-48 h-2 w-24 -rotate-12 rounded-full bg-pink-300" />
        <div className="absolute right-10 top-10 h-24 w-32 rotate-12 rounded-xl bg-indigo-500/70 shadow-xl" />
        <div className="absolute right-16 top-7 h-24 w-28 rotate-12 rounded-xl bg-indigo-400/90 shadow-xl" />
        <div className="absolute right-4 top-5 h-20 w-20 rounded-full bg-yellow-300" />
        <div className="absolute right-10 top-4 h-20 w-20 rounded-full bg-purple-400" />
        <div className="absolute right-14 top-9 h-10 w-10 rounded-full bg-violet-700 border-[10px] border-purple-300" />
    </div>
);

export default Login;
