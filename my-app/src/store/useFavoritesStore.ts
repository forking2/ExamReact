import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export type FavoriteType = "movie" | "series";

export type FavoriteItem = {
    id: number;
    type: FavoriteType;
    title: string;
    poster_path: string;
    vote_average: number;
};

type FavoritesStore = {
    favorites: FavoriteItem[];
    isFavorite: (type: FavoriteType, id: number) => boolean;
    toggleFavorite: (item: FavoriteItem) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            isFavorite: (type, id) =>
                get().favorites.some((item) => item.type === type && item.id === id),
            toggleFavorite: (item) =>
                set((state) => {
                    const exists = state.favorites.some(
                        (favorite) => favorite.type === item.type && favorite.id === item.id
                    );

                    return {
                        favorites: exists
                            ? state.favorites.filter(
                                  (favorite) => !(favorite.type === item.type && favorite.id === item.id)
                              )
                            : [...state.favorites, item],
                    };
                }),
        }),
        {
            name: "cineapp-favorites",
        }
    )
);
