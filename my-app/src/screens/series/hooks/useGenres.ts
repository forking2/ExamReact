import {useTranslation} from "react-i18next";

export const GENRE_IDS = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37];

export const useGenres = () => {
    const {t} = useTranslation();
    return GENRE_IDS.map(id => ({
        id,
        name: t(`genres.${id}`)
    }));
}