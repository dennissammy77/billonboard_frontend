import axios from 'axios';
import Handler from '../routehandler';

export default async function PaymentHandler(payload) {
	let base_url = await Handler();
    const result = await axios.post(`${base_url}/api/payment/new`,payload)
    return(result)
}

export async function GetTransactionStatus(orderTrackingId,email){
    let base_url = await Handler();
    const result = await axios.get(`${base_url}/api/payment/transaction_status?query=${orderTrackingId}&user_email=${email}`)
    return(result)
}