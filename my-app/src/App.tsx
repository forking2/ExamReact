import { Route, type RouteObject, Routes} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import Films from "./screens/films/Films.tsx";
import Providers from "@/providers/Providers.tsx";
import HeaderLayout from "./components/header/HeaderLayout.tsx";
import FilmRandomizer from "./screens/randomizer/FilmRandomizer.tsx";
import Film from "@/screens/film/Film.tsx";
import Main from "@/screens/main/Main.tsx";
import Series from "@/screens/series/Series.tsx";
import Serie from "@/screens/serie/Serie.tsx";
import SeriesRandomizer from "@/screens/seriesRandomizer/SeriesRandomizer.tsx";
import AboutUs from "@/screens/aboutUs/AboutUs.tsx";
import FooterLayout from "@/components/footer/FooterLayout.tsx";
import ContactUs from "@/screens/contactUs/ContactUs.tsx";
import Login from "@/screens/auth/Login.tsx";
import Register from "@/screens/auth/Register.tsx";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute.tsx";
import Favorites from "@/screens/favorites/Favorites.tsx";


function App() {
    const protectedRoutes: Array<RouteObject> = [
        {path: RouterEnum.MAIN, element: <Main/>},
        {path: RouterEnum.SERIES, element: <Series/>},
        {path: RouterEnum.TV_SHOW, element: <Serie/>},
        {path: RouterEnum.FILMS, element: <Films/>},
        {path: RouterEnum.FILM_RANDOMIZER, element: <FilmRandomizer/>},
        {path: RouterEnum.SERIES_RANDOMIZER, element: <SeriesRandomizer/>},
        {path: RouterEnum.MOVIE, element: <Film/>},
        {path: RouterEnum.ABOUT_US, element: <AboutUs/>},
        {path: RouterEnum.COUNTACT_US, element: <ContactUs/>},
        {path: RouterEnum.FAVORITES, element: <Favorites/>},
    ]

    return (
        <Providers>
            <Routes>
                <Route path={RouterEnum.LOGIN} element={<Login/>}/>
                <Route path={RouterEnum.REGISTER} element={<Register/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route element={<HeaderLayout />}>
                        <Route element={<FooterLayout />}>
                            {protectedRoutes.map((route, index) => (
                                <Route key={index} path={route.path} element={route.element} />
                            ))}
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Providers>
    )
}
export default App

