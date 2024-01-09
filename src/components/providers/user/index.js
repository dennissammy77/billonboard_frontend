"use client"

import useFetchUserData from "@/components/hooks/useFetchUserData.hook";
import { createContext, useEffect, useState} from "react";

export const UserContext = createContext(null)

export function UserProvider({children}){
	const [user,set_user]=useState(null);
	const [user_handler,set_user_handler]=useState(null);
	
	useEffect(()=>{
		fetch()
	},[user,user_handler]);
	
	async function fetch(){
		const result = await useFetchUserData();
		console.log('result',result)
		set_user(result);
	}
	return (
		<UserContext.Provider value={{user,set_user_handler}}>
			{children}
		</UserContext.Provider>
	)
}