import axios from 'axios';
import { LoginModels } from '~/models/loginModels/loginModels';
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body: LoginModels = await readBody(event);
        console.log(config.API_URL)
        const { data } = await axios.post(`${config.API_URL}/Auth/login`, body);
        setCookie(event, 'token', data?.resData[0]?.toKen);
        setCookie(event, 'userId', data?.resData[0]?.userId);
        setCookie(event, 'userName', data?.resData[0]?.userName);
        setCookie(event, 'status',data?.resData[0]?.userStatus)
        setCookie(event,'role',data?.resData[0]?.typeDesc)
        return data;
    } catch (error: any) {
        return error.response.data;
    }
});
