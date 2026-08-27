export interface IUser {
    email: string;
    password: string;
    login: string;
}

export interface ILoginUser {
    login: string;
    password: string;
}

export interface IUserProfile {
    id: string;
    email: string;
    login: string;
}

export interface ISupabaseAuthUser {
    id: string;
    email?: string;
    user_metadata?: {
        login?: string;
    };
}

export interface ISupabaseSession {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: ISupabaseAuthUser;
}

export interface ISupabaseAuthResponse {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    user: ISupabaseAuthUser;
}
