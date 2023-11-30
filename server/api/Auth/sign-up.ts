import axios from 'axios';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: any = await readBody(event);
        console.log(body)
        const { data } = await axios.post(`${config.API_URL}/Auth/Signup`, body);
        console.log(data)
        return data;

    } catch (error: any) {
        return 'error';
    }
});
