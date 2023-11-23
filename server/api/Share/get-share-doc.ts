import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        const { data } = await axios.post(`${config.API_URL}/Share/getShareDocument`, body);
        return data;

    } catch (error: any) {
        return error;
    }
});
