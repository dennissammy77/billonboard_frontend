import Handler from "@/api/routehandler";
import axios from 'axios'


// agency
export async function GetAgencyData(id) {
    let base_url = await Handler();  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${base_url}/api/clients/agencies/user?query=${id}`,
        headers: { }
    };
    const result = await axios.request(config).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
        throw new Error('Error while fetching the agency');
    });
	return result;
}