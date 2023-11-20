import axios from 'axios';
import { LoginModels } from '~/models/loginModels/loginModels';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: LoginModels = await readBody(event);

        const { data } = await axios.post(`${config.API_URL}/Login`, body, {
            // headers: {
            //     'x-api-key': config.API_KEY,
            //     language: 'la',
            // },
        });
        // setCookie(event, 'token', data.data.token);
        return data;
    } catch (error: any) {
        return error.response.data;
    }
});
