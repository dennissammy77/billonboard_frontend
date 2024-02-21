import Handler from "@/api/routehandler";
import axios from "axios";


export default async function Password_Reset(payload) {
    let base_url = await Handler();
    try {
        const result =  await axios.put(`${base_url}/api/password_reset`,payload);
        return result;
    } catch (error) {
        throw new Error('could not reset your password at the moment')
    }
}