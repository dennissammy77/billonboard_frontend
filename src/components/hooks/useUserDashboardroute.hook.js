export const useUserDashboardroute=(account_type,_id)=>{
    let route;
    if(account_type === 'client'){
        route = `/dashboard/client?uid=${_id}`
    }
    if(account_type === 'footsoldier'){
        route = `/dashboard/footsoldier?uid=${_id}`
    }
    if(account_type === 'agency'){
        route = `/dashboard/agency?uid=${_id}`
    }
    if(account_type === 'admin'){
        route = `/dashboard/admin?uid=${_id}`
    }
    return route;
}