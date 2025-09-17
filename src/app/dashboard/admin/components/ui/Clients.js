'use client'

import { Avatar, Center, Icon, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { ViewUser } from "./ViewUser";
import { dashboardContext } from "@/components/providers/dashboard.context";
import GetClients from "@/api/auth/client/client/all/route";

export const ClientsUser=({query})=>{
    const [data, set_data]=useState([]);
    const {page} = useContext(dashboardContext);

    useEffect(()=>{
        const get_Clients_Data = async()=>{
            let data = await GetClients();
            set_data(data?.data?.filter((item) => item?.first_name?.toLowerCase().includes(query?.toLowerCase())));
        }
        get_Clients_Data();
    },[query])
    return(
        <TableContainer bg='#fff' borderRadius={10} w='full' mt='2' boxShadow={'md'}>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>Seems there are no Clients that meet your search.</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > - </Th>
                            <Th > Name </Th>
                            <Th > Email </Th>
                            <Th > position </Th>
                            <Th > Actions   </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((user)=>{
                            return(
                                <User_Card key={user?._id} user={user}/>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </TableContainer>
    )
}

const User_Card=(props)=>{
    const { user} = {...props};
    const view_drawer_disclosure = useDisclosure();

    return(
        <Tr onClick={(()=>{view_drawer_disclosure.onToggle()})}>
            <Td>
                <Avatar src={user?.profile_photo_url} borderRadius={10} name={user?.first_name} alt='profile_image' boxSize={50} cursor='pointer'/>
            </Td>
            <Td> {user?.first_name} {user?.last_name} </Td>
            <Td> <Text fontSize={'xs'} color='gray.300'>{user?.email? user?.email : '-'}</Text></Td>
            <Td> <Text fontSize={'xs'} color='gray.300'>{user?.position? user?.position : '-'}</Text></Td>
            <Td> <IconButton icon={<HiOutlineExternalLink/>} size={'md'} /> </Td>
            <ViewUser view_drawer_disclosure={view_drawer_disclosure} data={user}/>
        </Tr>
    )
}