import Handler from "@/api/routehandler";
import axios from "axios";
import Cookies from 'universal-cookie';


export async function SEND_OTP_CODE_TO_USER (EMAIL){
    let BASE_URL = await Handler();
    const cookies = new Cookies();
    let CONFIG = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/auth/password/code/${EMAIL}`,
      headers: { }
    };
  
    const result = await axios.request(CONFIG).then((response) => {
        return response;
      }).catch((error) => {
        return(error)
      });
    if (result?.data?.error){
        return result;
    }else{
        cookies.set('reset_code_token', result?.data.token, {path: '/'});
        return result;
    }
  }
  export async function USER_PASSWORD_RESET_TO_NEW (data,EMAIL){
    let BASE_URL = await Handler();
    const cookies = new Cookies();
  
    const CODE_TOKEN = cookies.get('reset_code_token');
  
  
    let CONFIG = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/auth/password/new/${EMAIL}`,
      headers: { 
        'Authorization': `Bearer ${CODE_TOKEN}`
      },
      data: data
    };
  
    const result = await axios.request(CONFIG).then((response) => {
        return response;
      }).catch((error) => {
        return(error)
      });
      if (result?.data?.error){
          return result;
      }else{
          cookies.remove('user_token1', { path: '/' });
          cookies.remove('reset_code_token', { path: '/' });
          return result;
      }
  }