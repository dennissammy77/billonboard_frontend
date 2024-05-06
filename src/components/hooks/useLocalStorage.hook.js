export const UseStoreLocalStorage=async(key, data)=>{
    const saved_billboards = [];
    console.log(key,data)
    const fetched_data = await UseGetLocalStorage(key);
    console.log(fetched_data)
    if (!fetched_data || fetched_data?.length === 0){
        saved_billboards.push(data)
        localStorage.setItem(key,JSON.stringify(saved_billboards));
        return 'success';
    }else if(fetched_data?.length > 0){
        const existing_data = fetched_data?.find(item => item._id === data?._id);
        console.log(existing_data)
        if (!existing_data){
            fetched_data.push(data);
            localStorage.setItem(key,JSON.stringify(fetched_data));
            return 'success';
        }else{
            throw new Error('This data already exists');
            //return 'error';
        }
    }else{
        throw new Error('could not save data')
    }
}

export const UseGetLocalStorage=async(key)=>{
    let data = localStorage.getItem(key);
    return JSON.parse(data)
}

export const UseRemoveItemLocalStorage=async(key,data)=>{
    console.log(key,data)
    const fetched_data = await UseGetLocalStorage(key);
    console.log(fetched_data)
    if (!fetched_data){
        throw new Error('You dont have any data stored')
    }else if(fetched_data?.length > 0){
        const existing_data = fetched_data?.find(item => item._id === data?._id);
        if (existing_data){
            fetched_data.pop(data);
            localStorage.setItem(key,JSON.stringify(fetched_data));
        }else{
            throw new Error('This data is not in your saved items')
        }
    }else{
        throw new Error('could not remove data')
    }
}

export const UseClearLocalStorage=async(key)=>{
    localStorage.removeItem(key);
}