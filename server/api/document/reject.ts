import axios from 'axios';
import FormData from 'form-data';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        const { data } = await axios.post(`${config.API_URL}/Audit/rejectDocument`, body);
        return data;

    } catch (error: any) {
        return error?.respone?.data;
    }
});
