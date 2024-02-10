'use client'

import { UserContext } from "@/components/providers/user.context"
import { Button, Divider, Menu, MenuButton, MenuItem, MenuList, Select, Text } from "@chakra-ui/react"
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
                <Text py='2' pl='4' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('all')})}>All</Text>
                <Divider/>
                <Text py='2' pl='4' cursor={'pointer'} _hover={{bgColor:'#e3e3e3',borderRadius:'5'}} transition={'.3 ease-in-out'} onClick={(()=>{set_filter_option('available')})}>Availablility</Text>
                <Divider/>
                <Select placeholder='Seasons' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                    <option value='End of Year'>End of Year</option>
                    <option value='New Year'>New Year</option>
                    <option value='Easter'>Easter</option>
                    <option value='Valentine'>Valentine</option>
                    <option value='Eid'>Eid</option>
                    <option value='Christmas'>Christmas</option>
                    <option value='otherseason'>Other</option>
                </Select>
                <Divider/>
                <Select placeholder='Category' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                    <option value='education'>Education</option>
                    <option value='finance'>Finance</option>
                    <option value='agriculture'>Agriculture</option>
                    <option value='government'>Government</option>
                    <option value='technology'>Technology</option>
                    <option value='ecommerce'>Ecommerce</option>
                    <option value='Beauty&cosmetics'>Beauty & cosmetics</option>
                    <option value='business'>Business</option>
                    <option value='beverages'>Beverages</option>
                    <option value='government'>Government</option>
                    <option value='othercategory'>Other</option>
                </Select>
                <Divider/>
                {user?.account_type === 'agency' || user?.account_type === 'footsoldier' || user?.account_type === 'admin'? 
                    <Select placeholder='Publish Status' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                        <option value='draft'>Draft</option>
                        <option value='published'>Published</option>
                    </Select>
                : null}
                <Divider/>
                {user?.account_type === 'admin' ? 
                    <Select placeholder='Billboard Status' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                        <option value='suspended'>Suspended</option>
                        <option value='verified'>Verified</option>
                        <option value='unverified'>UnVerified</option>
                    </Select>
                    : null
                }
            </MenuList>
        </Menu>
    )
}