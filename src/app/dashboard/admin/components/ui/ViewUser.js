'use client'

import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, Icon, HStack, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, InputRightElement, Select, useFormControlStyles, Avatar,} from '@chakra-ui/react';
import { useContext, useState, useTransition } from 'react';

export const ViewUser=({view_drawer_disclosure,data})=>{
    const {set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);

    return(
        <Drawer
            isOpen={view_drawer_disclosure?.isOpen}
            placement='right'
            onClose={view_drawer_disclosure?.onClose}
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>View User</DrawerHeader>

            <DrawerBody mt='10px' p='4'>
                <HStack p='4' bg='#e5e5e5' borderRadius={10} boxShadow={'sm'}>
                    <Avatar src={data?.profile_photo_url} name={data?.company_name} />
                    <Box>
                        <Text fontWeight={'bold'} fontSize='20px'>{data?.company_name}</Text>
                        <Text fontSize={'sm'} color='gray.400'>{data?.company_email}</Text>
                    </Box>
                </HStack>
                <Box bg='#e5e5e5' borderRadius={10} boxShadow={'sm'} p='4' mt='2'>
                    <Text fontWeight={'bold'}>Company Details</Text>
                </Box>
            </DrawerBody>

            <DrawerFooter>
                <Button variant='outline' ml={3} onClick={view_drawer_disclosure?.onClose}>
                    Close
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

