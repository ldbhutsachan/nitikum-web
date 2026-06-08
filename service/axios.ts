import axios from "axios";
// import { useCookie } from "nuxt/app";
export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    const authorization = getHeader(event, 'Authorization');
    // const lang = useCookie<string>('langeText')
    const cookie = getHeaders(event).cookie
    // const lange = getCookieValue(cookie,'language')
    const axiosConfig = axios.create({
        baseURL: config.API_URL,
    });
    axiosConfig.interceptors.request.use((req) => {
        req.headers = {
            Authorization: authorization,
            language: 'lo'
        } as any;
        return req;
    });
    event.context.axios = axiosConfig;
});