'use client'

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import useFetchToken from '../hooks/useFetchToken.hook';
import { useToast } from '@chakra-ui/react';

export const dashboardContext = createContext(null);

export function DashboardProvider({children}) {
    const [signed_in,set_signed]=useState(useFetchToken())
    const [page,set_page]=useState('Home');
    const [active_page,set_active_page]=useState(page);
    const router = useRouter();
    const toast = useToast();
    
    useEffect(()=>{
        set_active_page(page);
        if(!signed_in){
            toast({ title: 'Authentication required to access dashboard', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            router.back('/');
            return ;
        }
    },[page]);

    return (
      <dashboardContext.Provider value={{active_page,page,set_page}}>
        {children}
      </dashboardContext.Provider>
    );
}