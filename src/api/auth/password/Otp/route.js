import Handler from "@/api/routehandler";
import axios from "axios";

let base_url = await Handler();

export default async function SendEmailOtp(payload) {
    const result = axios.post(`${base_url}/api/otp/send/password_reset`,payload);
    return result;
}