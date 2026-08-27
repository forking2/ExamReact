import {create} from "zustand/react";



export type Filters = {
    title: string;
    vote_average: string;
    genre_id: string;
    page: string;
    count: string;
}
type FilterStore = {
    filters: Filters;
    setFilters: (key: keyof Filters, value: string) => void;
    resetFilters: () => void;
}

const initialState: Filters = {
    title: '',
    vote_average:'',
    genre_id: '',
    page: '1',
    count: '20'
}

export const useFilmFilterStore = create<FilterStore>((set) => ({
    filters: initialState,
    setFilters: (key, value) =>
        set((state) => ({filters: {...state.filters, [key]: value}})),
    resetFilters: () => set({filters: initialState})
}))