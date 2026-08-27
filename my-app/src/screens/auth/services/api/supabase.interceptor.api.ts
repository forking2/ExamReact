import axios from "axios";
import {SUPABASE_KEY, SUPABASE_URL} from "@/config/api.config.ts";
import {tostik} from "@/utils/tostik.ts";

const baseHeaders = {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
};

export const supabaseAuth = axios.create({
    baseURL: `${SUPABASE_URL}/auth/v1`,
    headers: baseHeaders,
});

export const supabaseRest = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
        ...baseHeaders,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
    },
});

const attachErrorToast = (instanceName: string, instance: typeof supabaseAuth) => {
    instance.interceptors.request.use(async (config) => {
        console.log(`< ${instanceName} REQUEST > - `, config.url, config.params, config.data);
        return config;
    });

    instance.interceptors.response.use(
        (config) => config,
        async (error) => {
            const message = error?.response?.data?.msg || error?.response?.data?.message || error?.message;
            console.log(`< ${instanceName} ERROR > - `, message);
            tostik.error(error?.response?.data?.error_description || error?.response?.data?.message || "internal server error");
            throw error?.response?.data || error.message;
        },
    );
};

attachErrorToast("SUPABASE AUTH", supabaseAuth);
attachErrorToast("SUPABASE REST", supabaseRest);

export default supabaseRest;
