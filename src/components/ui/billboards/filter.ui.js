'use client'

import { UserContext } from "@/components/providers/user.context"
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { CiFilter } from "react-icons/ci"

export const Filter=({filter_option,set_filter_option})=>{
    const {user} = useContext(UserContext);

    return(
        <Menu>
            <MenuButton as={Button} rightIcon={<CiFilter />}>
                Filter
            </MenuButton>
            <MenuList>
                <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('all')})}>All</Text>
                <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('available')})}>Available</Text>
                <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('draft')})}>Draft</Text>
                <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('published')})}>Published</Text>
                {user?.account_type === 'admin' ? 
                    <>
                        <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('suspended')})}>Suspended</Text>
                        <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('verified')})}>Verified</Text>
                        <Text p='1' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('unverified')})}>UnVerified</Text>
                    </>
                    : null
                }
            </MenuList>
        </Menu>
    )
}