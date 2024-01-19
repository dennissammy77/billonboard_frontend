'use client'

import GetAdmin from "@/api/auth/client/admin/all/route"
import { dashboardContext } from "@/components/providers/dashboard.context"
import { Avatar, Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, position, useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { IoIosAdd } from "react-icons/io"
import { TiUserDelete } from "react-icons/ti";
import { NewUser } from "./components/ui/NewUser"
import DeleteUserAccount from "./components/ui/deleteAccountAdmin.ui"

export const Admin_Panel=()=>{
    const [users,set_users]=useState([]);
    const {set_page} = useContext(dashboardContext)
    const view_drawer_disclosure = useDisclosure()

    useEffect(()=>{
        FetchUsers()
    },[])
    const FetchUsers=async()=>{
        await GetAdmin().then((response)=>{
            set_users(response.data);
        }).catch((err)=>{
            console.log(err)
        })
    }
	return(
        <Box>
            <HStack justifyContent={'space-between'}>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Home')})}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>admin panel</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <NewUser view_drawer_disclosure={view_drawer_disclosure}/>
                <Button bg="#3874ff" color='#fff' leftIcon={<IoIosAdd />} onClick={(()=>{view_drawer_disclosure.onToggle()})}>New Administrator</Button>
            </HStack>
            <Box bg='#fff' borderTopEndRadius={10} borderTopStartRadius={10} borderBottomEndRadius={10} borderBottomStartRadius={10} my='4' boxShadow={'sm'} p='4'>
                {users?.map((user)=>{return(
                    <Box key={user?._id}>
                        <UserCard user={user}/>
                        <Divider />
                    </Box>
                )})}
            </Box>
        </Box>
	)
}

const UserCard=({user})=>{
    const {first_name, last_name, email, position, profile_photo_url} = user;
    const delete_account_disclosure = useDisclosure();
    return(
        <Flex align='center' w='full' gap='2' my='2' p='2'>
            <Flex align='center' flex='1' gap='2'>
                <Avatar src={profile_photo_url} name={`${first_name} ${last_name}`} alt='profile' size='md'/>
                <Box fontSize={'sm'}>
                    <Text>{first_name} {last_name}</Text>
                    <Text color='gray.300' fontSize={'xs'}>{email}</Text>
                    <Badge bgColor='orange'>{position}</Badge>
                </Box>
            </Flex>
            <Menu>
                <MenuButton>
                    <Icon as={BsThreeDotsVertical} />
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<TiUserDelete />} onClick={(()=>{delete_account_disclosure.onToggle()})}>
                        Delete User
                    </MenuItem>
                    <DeleteUserAccount delete_account_disclosure={delete_account_disclosure} data={user}/>
                </MenuList>
            </Menu>
        </Flex>
    )
}