import type { UseFetchOptions } from 'nuxt/app';
import { defu } from 'defu';

export function useServer<T>(url: string, options: UseFetchOptions<T> = {}) {
    const token = useCookie('token')
    let hder = {};
    if (process.server) {
        hder = useRequestHeaders();
    }

    const config = useRuntimeConfig();
    // console.log("config==",config.API_URL)
    const defaults: UseFetchOptions<T> = {
        baseURL: '/api/',
        // cache request
        key: url,

        // set user token if connected
        headers: {
            Authorization: token.value ? token.value: 'token',
            // 'x-api-key': config.API_KEY,
            ...hder,
        },

        onResponse(_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError(_ctx) {
            // throw new myBusinessError()
            switch (_ctx.response.status) {
                case 401:
                    console.log('Unauthorized');
                    break;
                case 403:
                    console.log('Forbidden');
                    break;
                case 404:
                    console.log('Not Found');
                    break;
                case 500:
                    console.log('Internal Server Error');
                    break;
                case 503:
                    console.log('Service Unavailable');
                    break;
                default:
                    console.log('Something went wrong');
                    break;
            }
        },
    };
    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults);
    return useFetch(url, params);
}
