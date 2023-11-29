import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        console.log(body)
        return ''
        const { data } = await axios.post(`${config.API_URL}/Section/SaveSection`, body);
        return data;

    } catch (error: any) {
        return error;
    }
});
