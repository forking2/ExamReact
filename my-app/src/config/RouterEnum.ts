// export enum RouterEnum {
//     MAIN = '/',
//     INFO = '/info',
// }

export const RouterEnum = {
    MAIN: '/',
    SERIES: '/series',
    TV_SHOW: '/tv/:id',
    FILMS: '/films',
    MOVIE: '/movie/:id',
    API_DOCS: '/api-docs',
    FILM_RANDOMIZER: '/film_random',
    SERIES_RANDOMIZER: '/series_random',
    ABOUT_US: '/about_us',
    COUNTACT_US: '/countact_us',
    LOGIN: '/login',
    REGISTER: '/register',
    FAVORITES: '/favorites',
}

export type RouterEnum = typeof RouterEnum[keyof typeof RouterEnum];
