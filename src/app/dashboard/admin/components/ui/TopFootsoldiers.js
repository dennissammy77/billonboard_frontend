'use client'

import { Avatar, Center, Icon, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import GetFootsolidier from "@/api/auth/client/footsoldier/all/route";
import { ViewUser } from "./ViewUser";
import { dashboardContext } from "@/components/providers/dashboard.context";
import BoardsByOwner from "@/api/billboards/owner/route";

export const TopFootSoldiers=({query})=>{
    const [data, set_data]=useState([]);
    const {page} = useContext(dashboardContext);

    useEffect(()=>{
        get_FootSoldiers_Data();
    },[query])
    async function get_FootSoldiers_Data(){
		let data = await GetFootsolidier();
        if (page === 'FootSoldiers'){
            set_data(data?.data?.filter((item) => item?.first_name?.toLowerCase().includes(query?.toLowerCase())))
        }else{
            set_data(data?.data)
        }
	}
    return(
        <TableContainer bg='#fff' borderRadius={10} w='full' mt='2' boxShadow={'md'}>
            {page === 'FootSoldiers' ? null : <Text p='4' fontSize={'md'} fontWeight={'bold'}> Best FootSoldiers</Text> }
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>Seems there are no FootSoldiers {page === 'FootSoldiers'? 'that meet your search' : 'currently active'}.</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > - </Th>
                            <Th > Name </Th>
                            <Th > Gender </Th>
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
    const fetch=async()=>{
        await BoardsByOwner(user?._id).then((response)=>{
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
            </Td>
            <Td> {user?.first_name} {user?.last_name} </Td>
            <Td> {user?.gender}</Td>
            <Td> {boards_data?.length}</Td>
            <Td> <IconButton icon={<HiOutlineExternalLink/>} size={'md'} /> </Td>
            <ViewUser view_drawer_disclosure={view_drawer_disclosure} data={user}/>
        </Tr>
    )
}