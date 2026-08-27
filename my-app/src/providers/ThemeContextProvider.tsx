import {createContext, type FC, type PropsWithChildren, useContext, useEffect, useState} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if(typeof window != 'undefined'){
            const storedTheme = localStorage.getItem('theme') as Theme;
            if(storedTheme) {
                return storedTheme;
            }
            if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
                return "dark";
            }
        }
        return 'light'
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme =() => {
        setThemeState((prevTheme) =>(prevTheme == 'light' ? 'dark' : 'light'));
    }
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
/* eslint-disable-next-line react-refresh/only-export-components */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}