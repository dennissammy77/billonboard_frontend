'use client'

import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { CiFilter } from "react-icons/ci"

export const Filter=()=>{
    return(
        <Menu>
            <MenuButton as={Button} rightIcon={<CiFilter />}>
                Filter
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}