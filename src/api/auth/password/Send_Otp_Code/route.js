import Handler from "@/api/routehandler";
import axios from "axios";


export default async function Send_Otp_Code(payload) {
    let base_url = await Handler();
    try {
        const result =  axios.post(`${base_url}/api/otp/send/password_reset`,payload);
        return result;
    } catch (error) {
        throw new Error('could not send the code to your email')
    }
}