'use client'

import { dashboardContext } from '@/components/providers/dashboard.context';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Image,
    Text,
    Flex,
    Box,
    Icon,
    HStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from '@chakra-ui/react';
import moment from 'moment';
import { useContext } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiUserLocationFill } from 'react-icons/ri';
import { TbWorld } from 'react-icons/tb';

export const View_side_Board=({data,view_side_disclosure})=>{
    const view_image_modal = useDisclosure()
    return(
        <Drawer
            isOpen={view_side_disclosure?.isOpen}
            placement='right'
            onClose={view_side_disclosure?.onClose}
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>View Side board</DrawerHeader>

            <DrawerBody mt='10px' p='4'>
                <Flex gap='2' my='2'>
                    <Image src={data?.image_url} alt="board image" boxSize={200} backgroundSize="cover" objectFit={'cover'} borderRadius={5} onClick={(()=>{view_image_modal?.onToggle()})} cursor='pointer' boxShadow={'mds'}/>
                    <Modal isOpen={view_image_modal?.isOpen} onClose={view_image_modal?.onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>-</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image src={data?.image_url} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
                        </ModalBody>
                        </ModalContent>
                    </Modal>
                    <Box>
                        <Text my='2' fontSize={'2xl'}>{data?.brand}</Text>
                        <Text fontSize='xl'>Side: {data?.side_ref_Id}</Text>
                    </Box>
                </Flex>
                <Box my='2'>
                    <Text fontWeight={'bold'}>Message</Text>
                    <Text>{data?.message}</Text>
                </Box>
                <HStack my='2'>
                    <Icon as={CiCalendarDate} boxSize={6}/>
                    <Text>{moment( data?.from_date).format("MMM Do YY")}</Text>
                    <Text>to</Text>
                    <Text>{moment( data?.to_date).format("MMM Do YY")}</Text>
                </HStack>
                <Box my='2'>
                    <Text fontWeight={'bold'}>Catch Phrase</Text>
                    <Text>{data?.catch_phrase}</Text>
                </Box>
                <HStack my='2'>
                    <Icon as={MdEmail} boxSize={4}/>
                    <Text>{data?.email_contact}</Text>
                </HStack>
                <HStack my='2'>
                    <Icon as={FaPhone} boxSize={4}/>
                    <Text>{data?.mobile_contact}</Text>
                </HStack>
                <HStack my='2'>
                    <Icon as={RiUserLocationFill} boxSize={4}/>
                    <Text>{data?.address}</Text>
                </HStack>
                <HStack my='2'>
                    <Icon as={TbWorld} boxSize={4}/>
                    <Text>{data?.website}</Text>
                </HStack>
                <HStack my='2'>
                    <Text>Season: </Text>
                    <Text ml='2'>{data?.season}</Text>
                </HStack>
                <HStack my='2'>
                    <Text>Category: </Text>
                    <Text ml='2'>{data?.category}</Text>
                </HStack>
                <HStack my='2'>
                    <Text>Orientation: </Text>
                    <Text ml='2'>{data?.orientation}</Text>
                </HStack>
            </DrawerBody>
            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={view_side_disclosure?.onClose}>
                    Close
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

