'use client'

import { Avatar, Center, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolderOpen, FaStore } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useEffect, useState } from "react";
import GetFootsolidier from "@/api/auth/client/footsoldier/all/route";

export const TopFootSoldiers=()=>{
    const [data, set_data]=useState([])

    useEffect(()=>{
        get_FootSoldiers_Data()
    },[])
    async function get_FootSoldiers_Data(){
		let data = await GetFootsolidier();
        console.log(data)
		set_data(data.data)
	}
    return(
        <TableContainer bg='#fff' borderRadius={10} w='full' mt='2' boxShadow={'md'}>
            <Text p='4' fontSize={'md'} fontWeight={'bold'}> Best FootSoldiers</Text>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>Seems there are no FootSoldiers currently active.</Text>
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
    return(
        <Tr>
            <Td>
                <Avatar src={user?.profile_photo_url} borderRadius={10} name={user?.first_name} alt='profile_image' boxSize={50}/>
            </Td>
            <Td> {user?.first_name} {user?.last_name} </Td>
            <Td> {user?.gender}</Td>
            <Td> 20</Td>
            <Td> <IconButton icon={<HiOutlineExternalLink/>} size={'md'}/> </Td>
        </Tr>
    )
}