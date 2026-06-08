import axios from 'axios';
import FormData from 'form-data';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        console.log('=====',body)
        return
        const { data } = await axios.post(`${config.API_URL}/Document/SaveDoc`, body);
        return data;

    } catch (error: any) {
        return error?.respone?.data;
    }
});
