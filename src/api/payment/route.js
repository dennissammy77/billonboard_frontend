import axios from 'axios';
import Handler from '../routehandler';

export default async function PaymentHandler(payload) {
	let base_url = await Handler();
    const result = await axios.post(`${base_url}/api/payment/new`,payload)
    return(result)
}