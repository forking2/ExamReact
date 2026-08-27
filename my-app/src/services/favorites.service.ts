import {supabaseRest} from "@/screens/auth/services/api/supabase.interceptor.api.ts";
import {AuthService} from "@/screens/auth/services/auth.service.ts";

export type FavoriteType = "movie" | "series";

export interface IFavoriteRow {
    id: string;
    film_id: string;
    type: FavoriteType;
}

const authHeaders = () => {
    const session = AuthService.getStoredSession();

    return session?.access_token
        ? {Authorization: `Bearer ${session.access_token}`}
        : undefined;
};

export const FavoritesService = {
    getFavorites: async (): Promise<Array<IFavoriteRow>> => {
        const session = AuthService.getStoredSession();

        if (!session?.access_token) {
            return [];
        }

        const response = await supabaseRest.get<Array<IFavoriteRow>>(
            "/film?select=id,film_id,type",
            {headers: authHeaders()}
        );

        return response.data;
    },

    addFavorite: async (filmId: string, type: FavoriteType) => {
        const response = await supabaseRest.post<Array<IFavoriteRow>>(
            "/film",
            {film_id: filmId, type},
            {headers: authHeaders()}
        );

        return response.data;
    },

    removeFavorite: async (filmId: string, type: FavoriteType) => {
        await supabaseRest.delete(
            `/film?film_id=eq.${encodeURIComponent(filmId)}&type=eq.${type}`,
            {headers: authHeaders()}
        );
    },
};
