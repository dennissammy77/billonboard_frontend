export const useUserDashboardroute=(account_type,_id)=>{
    let route;
    if(account_type === 'client'){
        route = `/dashboard/client?uid=${_id}`
    }
    return route;
}