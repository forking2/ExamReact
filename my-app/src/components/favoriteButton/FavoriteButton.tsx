import type {FavoriteType} from "@/services/favorites.service.ts";
import {useIsFavorite, useToggleFavoriteMutation} from "@/hooks/useFavorites.ts";

export type FavoriteItem = {
    id: number;
    type: FavoriteType;
    title: string;
    poster_path: string;
    vote_average: number;
};

type FavoriteButtonProps = {
    item: FavoriteItem;
    className?: string;
    variant?: "overlay" | "solid";
};

const FavoriteButton = ({item, className = "", variant = "overlay"}: FavoriteButtonProps) => {
    const isFavorite = useIsFavorite(item.id, item.type);
    const toggleFavorite = useToggleFavoriteMutation();

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (toggleFavorite.isPending) {
            return;
        }

        toggleFavorite.mutate({id: item.id, type: item.type});
    };

    const baseClasses =
        variant === "overlay"
            ? "bg-black/60 hover:bg-black/80 backdrop-blur-sm"
            : "bg-[var(--bg-card)] hover:bg-[var(--bg-muted)] border border-[var(--border)]";

    const strokeColor =
        variant === "overlay"
            ? (isFavorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-white")
            : (isFavorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-[var(--text-muted)]");

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={toggleFavorite.isPending}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
            className={`flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 disabled:opacity-60 ${baseClasses} ${className}`}
        >
            <svg
                viewBox="0 0 24 24"
                className={`w-4 h-4 transition-colors duration-200 ${strokeColor}`}
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c-.3 0-.6-.1-.84-.3C8.6 17.95 3 13.62 3 9.06 3 6.27 5.2 4 7.94 4c1.6 0 3.1.78 4.06 2.03C12.96 4.78 14.46 4 16.06 4 18.8 4 21 6.27 21 9.06c0 4.56-5.6 8.9-8.16 10.89-.24.2-.54.3-.84.3z"
                />
            </svg>
        </button>
    );
};

export default FavoriteButton;
