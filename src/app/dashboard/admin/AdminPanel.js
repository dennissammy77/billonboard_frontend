'use client'

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Text } from "@chakra-ui/react"
import { IoIosAdd } from "react-icons/io"

export const Admin_Panel=()=>{
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
                <Button bg="#3874ff" color='#fff' leftIcon={<IoIosAdd />}>New Administrator</Button>
            </HStack>
            <Box bg='#fff' borderTopEndRadius={10} borderTopStartRadius={10} borderBottomEndRadius={10} borderBottomStartRadius={10} h='20vh' my='4' boxShadow={'sm'} p='4'>
                <Text>sdsd</Text>
            </Box>
        </Box>
	)
}