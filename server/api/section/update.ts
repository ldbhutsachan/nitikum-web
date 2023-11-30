import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        const { data } = await axios.post(`${config.API_URL}/Section/updateSection`, body);
        return data;

    } catch (error: any) {
        return 'error';
    }
});
