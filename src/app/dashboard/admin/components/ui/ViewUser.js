'use client'

import BoardsByOwner from '@/api/billboards/owner/route';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, Icon, HStack, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, InputRightElement, Select, useFormControlStyles, Avatar, Wrap, WrapItem, Badge,} from '@chakra-ui/react';
import { useContext, useEffect, useState, useTransition } from 'react';
import { MdMarkEmailRead, MdOutlineMailOutline } from 'react-icons/md';

export const ViewUser=({view_drawer_disclosure,data})=>{
    const {set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const [boards_data, set_boards_data]=useState([]);
    useEffect(()=>{
        fetch()
    },[data?._id]);
    const fetch=async()=>{
        await BoardsByOwner(data?._id).then((response)=>{
            const arr = response?.data
            set_boards_data(arr)
        }).catch((err)=>{
            console.log(err)
        })
    }
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
                {user?.account_type === 'admin'? 
                <Wrap my='2'>
                    {data?.verified_email_status ? <WrapItem> <Badge><Icon as={MdMarkEmailRead} boxSize='3' />Email status</Badge> </WrapItem> : <WrapItem> <Badge><Icon as={MdOutlineMailOutline} boxSize='3' />Email status</Badge> </WrapItem> }
                    {data?.verification_status ? <WrapItem> <Badge>Verified</Badge> </WrapItem> : null }
                    {data?.account_suspension_status ? <WrapItem> <Badge bgColor='red.200'>Suspended</Badge> </WrapItem> : null }
                    {data?.account_susbscription_status ? <WrapItem> <Badge bgColor='gold'>Subscribed</Badge> </WrapItem> : null }
                </Wrap> : null }
                <HStack p='4' bg='#e5e5e5' borderRadius={10} boxShadow={'sm'}>
                    <Avatar src={data?.profile_photo_url} name={data?.company_name || data?.first_name} />
                    <Box>
                        <Text fontWeight={'bold'} fontSize='20px'>{data?.company_name || data?.first_name}</Text>
                        <Text fontSize={'sm'} color='gray.400'>{data?.company_email || data?.email}</Text>
                    </Box>
                </HStack>
                <Box bg='#e5e5e5' borderRadius={10} boxShadow={'sm'} p='4' mt='2' fontSize={'sm'}>
                    <Text fontWeight={'bold'}>User Details</Text>
                    <Text>Name: {data?.first_name} {data?.last_name}</Text>
                    <Text>Email: {data?.email}</Text>
                    <Text>Mobile: {data?.mobile}</Text>
                    <Text>Address: {data?.address}</Text>
                    <Text>Gender: {data?.gender}</Text>
                    <Text>Position: {data?.position}</Text>
                    <Text>Account type: {data?.account_type}</Text>
                </Box>
                <Box bg='#e5e5e5' borderRadius={10} boxShadow={'sm'} p='4' mt='2' fontSize={'sm'}>
                    <Text fontWeight={'bold'}>Company Details</Text>
                    <Text>Name: {data?.company_name}</Text>
                    <Text>Email: {data?.company_email}</Text>
                    <Text>Mobile: {data?.company_mobile}</Text>
                    <Text>address: {data?.company_address}</Text>
                </Box>
                {data?.account_type === 'agency' || data?.account_type === 'footsoldier'? 
                <Box>
                    <Text fontWeight={'bold'}>Boards</Text>
                    <Wrap>
                        {boards_data?.advertisement_data?.map((data, data_id)=>{
                            return(
                                <Image key={data?._if} src={data?.image_url} boxSize={50} fallbackSrc={'https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'} alt='board_image'/>
                            )
                        })}
                    </Wrap>
                </Box> : null }
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

