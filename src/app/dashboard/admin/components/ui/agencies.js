'use client'

import { Avatar, Center, Icon, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FaFolderOpen, FaStar } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useEffect, useState } from "react";
import { ViewUser } from "./ViewUser";
import GetAgencies from "@/api/auth/client/agency/all/route";
import BoardsByOwner from "@/api/billboards/owner/route";

export const AgenciesUser=({query})=>{
    const [data, set_data] = useState([]);
    useEffect(()=>{
      fetch()
    },[query])
    async function fetch(){
      await GetAgencies().then((response)=>{
        const arr = response?.data
        set_data(arr.filter((item) => item.company_name?.toLowerCase().includes(query.toLowerCase())))
      }).catch((err)=>{
        console.log(err)
      })
    }

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
                            <Th > Boards </Th>
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

    const [boards_data, set_boards_data]=useState([]);
    useEffect(()=>{
        fetch()
    },[user?._id]);
    const payload = {
        id: user?._id,
        acc_type: user?.account_type
    }
    const fetch=async()=>{
        await BoardsByOwner(payload).then((response)=>{
            const arr = response?.data;
            set_boards_data(arr)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <Tr onClick={(()=>{view_drawer_disclosure.onToggle()})}>
            <Td>
                <Avatar src={user?.profile_photo_url} borderRadius={10} name={user?.first_name} alt='profile_image' boxSize={50} cursor='pointer'/>
                {user?.account_susbscription_token? <Icon as={FaStar} boxSize={'4'} color='gold'/> : <Icon as={FaStar} boxSize={'4'} color='gray.200' my='3'/> }
            </Td>
            <Td> {user?.company_name? user?.company_name : user?.first_name} </Td>
            <Td> <Text fontSize={'xs'} color='gray.300'>{user?.company_email? user?.company_email : user?.email}</Text></Td>
            <Td> <Text fontSize={'xs'} color='gray.300'>{user?.position? user?.position : '-'}</Text></Td>
            <Td> {boards_data?.length}</Td>
            <Td> <IconButton icon={<HiOutlineExternalLink/>} size={'md'} /> </Td>
            <ViewUser view_drawer_disclosure={view_drawer_disclosure} data={user}/>
        </Tr>
    )
}