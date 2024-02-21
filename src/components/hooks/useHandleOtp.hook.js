import Send_Otp_Code from '@/api/auth/password/Send_Otp_Code/route';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Generate_Otp=async()=>{
    const characters = '0123456789';
    let result = ''
    const charactersLength = characters.length
    for (let i = 0;i<6;i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    cookies.set('otp_code', result, { path: '/' });
    return result;
}

export const SendEmailOtp=async(payload)=>{
    try {
        const result = await Send_Otp_Code(payload);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const Verify_otp=async(user_input)=>{
    const otp_code = await cookies.get('otp_code');
    console.log(otp_code,user_input)
    if (user_input === otp_code){
        return 'success';
    }
    return 'error'
}