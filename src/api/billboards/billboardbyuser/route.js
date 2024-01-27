import axios from 'axios';

export default async function BoardDataByUser(payload) {
	const env = process.env.NODE_ENV;

	const devbaseurl = process.env.NEXT_PUBLIC_DEV_BASEURL;
	const prodbaseurl = process.env.NEXT_PUBLIC_PROD_BASEURL;
  
	let base_url;
	if(env == "development"){
		base_url = devbaseurl;
	}else if(env == "production"){
		base_url = prodbaseurl;
	}
	const result = await axios.get(`${base_url}/api/billboards/billboard?query=${payload?.boardid}&&acc_type=${payload?.acc_type}`);
	return result
}