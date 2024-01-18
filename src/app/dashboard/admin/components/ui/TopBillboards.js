'use client'

import { Avatar, Box, Center, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolderOpen, FaStore } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useState } from "react";

export const TopBillboards=()=>{
    return(
        <Flex flexDirection={'column'} borderRadius={10} boxShadow='md' p='2' mt='2' bg='#fff' w={{base:'full',md:'30%'}}>
            <Text p='4' fontSize={'md'} fontWeight={'bold'}> Top Billboards</Text>
            <Board_Card />
            <Board_Card />
            <Board_Card />
        </Flex>
    )
}

const Board_Card=(props)=>{
    return(
        <Flex gap='2' my='2' align='center'>
            <Avatar borderRadius={10}/>
            <Box>
                <Text fontSize={'sm'} fontWeight={'bold'}>Name of Billboard</Text>
                <Text fontSize={'xs'}>Views</Text>
                <Text fontSize={'xs'}>Agency</Text>
            </Box>
        </Flex>
    )
}