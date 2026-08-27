import axios from "axios";
import {BASE_URL, TMDB_API_KEY} from "@/config/api.config.ts";
import {tostik} from "@/utils/tostik.ts";



export const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: "en-US",

    },
    headers: {
        'Content-Type': 'application/json',
    }
});
tmdb.interceptors.request.use(async (config) =>{
    console.log("< REQUEST > - ", config.url, config.params, config.data);
    return config;
})


tmdb.interceptors.response.use(
    (config) => config,
    async (error) => {
        console.log("< ERROR > - ", error?.response?.data?.message || error?.message);
        tostik.error(error?.response?.data?.error || "internal server error")
        throw error?.response?.data || error.message;
    },
)

export default tmdb;