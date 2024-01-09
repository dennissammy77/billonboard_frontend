import useFetchToken from "./useFetchToken.hook";
import FetchUser from "@/api/auth/client/user/route";

const useFetchUserData = async() =>{
    const retrived_token = useFetchToken();
    let data = null;
    if (retrived_token === null){
        return null;
    }
    console.log(retrived_token)
    if(retrived_token?.account_type === 'client'){
        const result = await FetchUser(retrived_token?.email).then((res)=>{
            console.log(res)
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        data = result;
    }
    return data;
}
export default useFetchUserData;