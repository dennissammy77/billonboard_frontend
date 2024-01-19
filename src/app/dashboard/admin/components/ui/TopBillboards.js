'use client'

import { Avatar, Box, Center, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolderOpen, FaStore } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useEffect, useState } from "react";
import GetBillBoards from "@/api/billboards/all/route";

export const TopBillboards=()=>{
    const [billboards,set_billboards]=useState([]);

    useEffect(()=>{
        get_BillBoards()
    },[])
    async function get_BillBoards(){
		let data = await GetBillBoards();
        console.log(data)
		set_billboards(data.data)
	}
    return(
        <Flex flexDirection={'column'} borderRadius={10} boxShadow='md' p='2' mt='2' bg='#fff' w={{base:'full',md:'30%'}}>
            <Text p='4' fontSize={'md'} fontWeight={'bold'}> Top Billboards</Text>
            {billboards?.map((board)=>{
                return(
                    <Board_Card key={board?._id} board={board}/>
                )
            })}
        </Flex>
    )
}

const Board_Card=({board})=>{
    return(
        <Flex gap='2' my='2' align='center'>
            <Image src={board?.advertisement_data[0]?.image_url} borderRadius={10} alt='bord_image' boxSize={50}/>
            <Box>
                <Text fontSize={'sm'} fontWeight={'bold'}>{board?.name_of_billboard}</Text>
                <Text fontSize={'xs'}>{board?.views}</Text>
                <Text fontSize={'xs'}>{board?.ad_agency_name}</Text>
            </Box>
        </Flex>
    )
}