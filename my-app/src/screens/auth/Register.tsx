import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {useAuthMutation} from "@/screens/auth/hooks/useAuthMutation.ts";
import {registerSchema, type RegisterFormValues} from "@/screens/auth/schemas/auth.schema.ts";

const Register = () => {
    const {t} = useTranslation();
    const registerMutation = useAuthMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {login: "", email: "", password: "", confirmPassword: ""},
        mode: "onBlur",
    });

    const onSubmit = (data: RegisterFormValues) => {
        registerMutation.mutate({
            data: {
                login: data.login,
                email: data.email,
                password: data.password,
            },
        });
    };

    return (
        <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
            <section className="w-full max-w-5xl min-h-[680px] bg-[var(--bg-card)] border border-[var(--border)] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="hidden lg:flex relative items-center justify-center bg-violet-300/70 dark:bg-violet-900/40 overflow-hidden">
                    <MonitorIllustration />
                </div>

                <div className="px-6 py-8 sm:px-10 lg:px-20 flex items-center justify-center bg-[var(--bg-card)]">
                    <div className="w-full max-w-sm">
                        <p className="text-xs text-[var(--text-muted)] mb-14">{t("auth.register.page")}</p>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                            <h1 className="text-center text-sm font-bold text-[var(--text)] mb-2">
                                {t("auth.register.title")}
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
                                {t("auth.fields.email")}
                                <input
                                    type="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    className="h-10 rounded-full border border-violet-400 bg-transparent px-4 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                                />
                                {errors.email && (
                                    <span className="text-[11px] text-red-500">{t(errors.email.message as string)}</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-2 text-xs font-medium text-[var(--text)]">
                                {t("auth.fields.password")}
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    {...register("password")}
                                    className="h-10 rounded-full border border-violet-400 bg-transparent px-4 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                                />
                                {errors.password && (
                                    <span className="text-[11px] text-red-500">{t(errors.password.message as string)}</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-2 text-xs font-medium text-[var(--text)]">
                                {t("auth.fields.confirm_password")}
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    {...register("confirmPassword")}
                                    className="h-10 rounded-full border border-violet-400 bg-transparent px-4 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                                />
                                {errors.confirmPassword && (
                                    <span className="text-[11px] text-red-500">{t(errors.confirmPassword.message as string)}</span>
                                )}
                            </label>

                            {registerMutation.isError && (
                                <p className="text-xs text-red-500 text-center">{t("auth.errors.register_failed")}</p>
                            )}

                            <button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="mt-3 h-10 rounded-full bg-violet-500 text-white text-sm font-semibold transition hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {registerMutation.isPending ? t("auth.register.loading") : t("auth.register.submit")}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-[var(--text)]">
                            {t("auth.register.has_account")}{" "}
                            <Link to={RouterEnum.LOGIN} className="font-semibold hover:text-violet-500 transition">
                                {t("auth.register.login_link")}
                            </Link>
                        </div>

                        <SocialLinks />
                    </div>
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

const MonitorIllustration = () => (
    <div className="relative h-80 w-80">
        <div className="absolute left-4 top-0 h-72 w-24 -rotate-6 rounded-b-full bg-violet-500" />
        <div className="absolute left-20 top-36 h-36 w-48 rounded-xl bg-indigo-500 shadow-2xl" />
        <div className="absolute left-24 top-44 h-24 w-36 rounded-xl bg-indigo-300/70" />
        <div className="absolute left-32 top-72 h-12 w-16 bg-zinc-200 dark:bg-zinc-300" />
        <div className="absolute left-20 top-[19rem] h-4 w-32 rounded-full bg-zinc-300" />
        <div className="absolute left-40 top-48 h-3 w-20 rounded-full bg-teal-300" />
        <div className="absolute left-9 top-40 h-36 w-20 rounded-xl bg-indigo-950 shadow-xl" />
        <div className="absolute left-14 top-52 h-3 w-12 rounded-full bg-zinc-200" />
        <div className="absolute left-14 top-64 h-3 w-8 rounded-full bg-amber-300" />
        <div className="absolute left-12 top-44 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-300" />
            <span className="h-2 w-2 rounded-full bg-pink-300" />
            <span className="h-2 w-2 rounded-full bg-indigo-300" />
        </div>
        <div className="absolute right-0 top-20 h-24 w-40 rounded-xl bg-teal-300 shadow-xl" />
        <div className="absolute right-4 top-24 h-16 w-32 rounded-lg bg-teal-100" />
        <div className="absolute right-3 top-28 h-12 w-32 rotate-[-25deg] bg-teal-200" />
        <div className="absolute right-0 top-28 h-12 w-36 rotate-[25deg] bg-teal-400/70" />
        <div className="absolute right-10 bottom-12 h-8 w-8 rounded-full bg-indigo-500" />
    </div>
);

export default Register;
