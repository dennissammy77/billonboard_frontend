import Cookies from 'universal-cookie';

export default function logOut(){
    const cookies = new Cookies();
    cookies.remove('user_token1', { path: '/' });
}