import Handler from "@/api/routehandler";
import axios from "axios";

let base_url = await Handler();

export async function Password_Reset(payload) {
    const result = await axios.put(`${base_url}/api/password_reset`,payload);
    return result;
}

// export const Otp=async(payload)=>{
//     const result = axios.post(`${base_url}/api/otp/send/password_reset`,payload);
//     return result;
// }

export async function EmailOtp(payload) {
    const result = axios.post(`${base_url}/api/otp/send/verify_email`,payload);
    return result;
}