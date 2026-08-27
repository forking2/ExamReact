import {supabaseAuth, supabaseRest} from "@/screens/auth/services/api/supabase.interceptor.api.ts";
import type {
    ILoginUser,
    ISupabaseAuthResponse,
    ISupabaseAuthUser,
    ISupabaseSession,
    IUser,
    IUserProfile
} from "@/screens/auth/types/User.ts";

const AUTH_SESSION_KEY = "cineapp-auth-session";

const toSession = (data: ISupabaseAuthResponse): ISupabaseSession | null => {
    if (!data.access_token || !data.refresh_token || !data.expires_in || !data.token_type) {
        return null;
    }

    return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        token_type: data.token_type,
        user: data.user,
    };
};

export const AuthService = {
    signUp: async ({data}: {data: IUser}) => {
        const authResponse = await supabaseAuth.post<ISupabaseAuthResponse>("/signup", {
            email: data.email,
            password: data.password,
            data: {
                login: data.login,
            },
        });

        const session = toSession(authResponse.data);
        const profile: IUserProfile = {
            id: authResponse.data.user.id,
            email: data.email,
            login: data.login,
        };

        await supabaseRest.post<Array<IUserProfile>>("/users", profile, {
            headers: session?.access_token
                ? {Authorization: `Bearer ${session.access_token}`}
                : undefined,
        });

        if (session) {
            AuthService.saveSession(session);
        }

        return {
            user: authResponse.data.user,
            session,
            profile,
        };
    },

    signIn: async ({data}: {data: ILoginUser}) => {
        const email = data.login.includes("@")
            ? data.login
            : await AuthService.getEmailByLogin(data.login);

        const response = await supabaseAuth.post<ISupabaseAuthResponse>("/token?grant_type=password", {
            email,
            password: data.password,
        });
        const session = toSession(response.data);

        if (session) {
            AuthService.saveSession(session);
        }

        return {
            user: response.data.user,
            session,
        };
    },

    signOut: async () => {
        const session = AuthService.getStoredSession();

        if (session?.access_token) {
            await supabaseAuth.post("/logout", undefined, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });
        }

        AuthService.clearSession();
    },

    getCurrentUser: async () => {
        const session = AuthService.getStoredSession();

        if (!session?.access_token) {
            return null;
        }

        const response = await supabaseAuth.get<ISupabaseAuthUser>("/user", {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        });

        return response.data;
    },

    getAllProfiles: () =>
        supabaseRest.get<Array<IUserProfile>>("/users?select=id,email,login"),

    getEmailByLogin: async (login: string) => {
        const response = await supabaseRest.get<Array<Pick<IUserProfile, "email">>>(
            `/users?login=eq.${encodeURIComponent(login)}&select=email&limit=1`
        );
        const email = response.data[0]?.email;

        if (!email) {
            throw new Error("User with this login was not found");
        }

        return email;
    },

    saveSession: (session: ISupabaseSession) => {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    },

    getStoredSession: (): ISupabaseSession | null => {
        const session = localStorage.getItem(AUTH_SESSION_KEY);
        return session ? JSON.parse(session) as ISupabaseSession : null;
    },

    clearSession: () => {
        localStorage.removeItem(AUTH_SESSION_KEY);
    },
};
