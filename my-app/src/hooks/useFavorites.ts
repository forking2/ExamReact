import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {FavoritesService, type FavoriteType} from "@/services/favorites.service.ts";
import {AuthService} from "@/screens/auth/services/auth.service.ts";

export const FAVORITES_QUERY_KEY = ["favorites"];

export const useFavoritesQuery = () => {
    const session = AuthService.getStoredSession();

    return useQuery({
        queryKey: FAVORITES_QUERY_KEY,
        queryFn: FavoritesService.getFavorites,
        enabled: Boolean(session?.access_token),
        staleTime: 1000 * 30,
    });
};

export const useIsFavorite = (id: number, type: FavoriteType) => {
    const {data: favorites = []} = useFavoritesQuery();
    return favorites.some((item) => item.film_id === String(id) && item.type === type);
};

export const useToggleFavoriteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, type}: {id: number; type: FavoriteType}) => {
            const filmId = String(id);
            const favorites = queryClient.getQueryData<Array<{film_id: string; type: FavoriteType}>>(
                FAVORITES_QUERY_KEY
            ) ?? [];

            const exists = favorites.some((item) => item.film_id === filmId && item.type === type);

            if (exists) {
                await FavoritesService.removeFavorite(filmId, type);
            } else {
                await FavoritesService.addFavorite(filmId, type);
            }
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: FAVORITES_QUERY_KEY}),
    });
};
