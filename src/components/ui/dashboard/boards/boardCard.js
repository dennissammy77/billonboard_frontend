import { Badge, Box, Button, Divider, Flex, HStack, Icon, IconButton, Image, ListItem, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Portal, Text, Tooltip, UnorderedList, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { FaInfoCircle, FaStar } from 'react-icons/fa';
import { BsFillPinMapFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaChalkboardUser } from "react-icons/fa6";
import { TbExternalLink } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from 'react-icons/io';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { MdEditDocument } from 'react-icons/md';

export const BoardCard=({board})=>{
    const {name_of_billboard, ad_agency_name,location, bob_rating, img_placeholder,advertisement_data,ad_agency_mobile,location_cord,ad_agency_email,publish_status } = {...board}
    const {set_page,set_board_data} = useContext(dashboardContext);

    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w='100%' h='400px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Image opacity={publish_status? '1' : '.6'} src={advertisement_data?.length > 0 && advertisement_data[advertisement_data.length - 1]?.image_url !== ''? advertisement_data[advertisement_data.length - 1]?.image_url: img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5' onClick={onOpen}/>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>-</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Image src={advertisement_data?.length > 0 && advertisement_data[advertisement_data.length - 1]?.image_url !== ''? advertisement_data[advertisement_data.length - 1]?.image_url: img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
            </ModalBody>
            </ModalContent>
        </Modal>
        <Flex justify={'end'} flexDirection={'column'} gap='2' position={'absolute'} bottom={'0'} left={'0'} p='4' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.9),  rgba(0,0,0,0.8),  rgba(0,0,0,0.7), rgba(0,0,0,0.6), rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.2), rgba(0,0,0,0))" w='full' h='40%' borderRadius={'md'} cursor={'pointer'} fontSize='xs' transition={'.3s ease-in-out'} _hover={{fontSize:'sm'}}>
            <Text>{name_of_billboard}</Text>
            <HStack>
                <Icon boxSize={4} as={FaChalkboardUser}/>
                <Text>{ad_agency_name}</Text>
            </HStack>
            <HStack>
                <Icon boxSize={4} as={BsFillPinMapFill}/>
                <Text>{location}</Text>
            </HStack>
            <HStack color='#3874ff'>
                <Icon boxSize={4} as={FaStar}/>
                <Badge bgColor={'#3874ff'} color={'#fff'}>{bob_rating}/5</Badge>
            </HStack>
        </Flex>
        <VStack position={'absolute'} top='2' right={'2'}>
            <Menu >
                <MenuButton as={Button} size='sm' transition={'.3s ease-in-out'} bgColor='#fff' _hover={{bgColor:'#3874ff',color:'#fff'}}> 
                    <Icon aria-label='options for board' as={BsThreeDotsVertical} boxSize={4}/>
                </MenuButton>
                <MenuList p='2'>
                    <MenuItem icon={<IoMdAdd/>} onClick={(()=>{set_page('New_Side');set_board_data(board)})}>Add a Board</MenuItem>
                    <MenuItem icon={<TbExternalLink/>} onClick={(()=>{set_page('View_Side');set_board_data(board)})}>View BillBoard</MenuItem>
                    <MenuItem icon={<FiEdit/>} onClick={(()=>{set_page('Edit_Board');set_board_data(board)})}>Edit BillBoard</MenuItem>
                </MenuList>
            </Menu>
            {advertisement_data?.length === 0 ||  ad_agency_email == '' || ad_agency_mobile == '' || location_cord.Latitude == '' || location_cord.Longitude == '' ?
                <Popover placement='auto'>
                    <PopoverTrigger>
                        <IconButton icon={<FaInfoCircle/>} isRound={true} variant='solid' colorScheme='orange' border='1px solid #fff' borderRadius={'full'} cursor={'pointer'}/>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Text fontSize={'xs'}>This Listing is incomplete</Text>
                                <Divider />
                                <UnorderedList fontSize={'xs'}>
                                    <ListItem textDecoration={advertisement_data?.length > 0 ? 'line-through' : ''} color={advertisement_data?.length > 0 ? 'gray.200': ''}>Add at least one side board </ListItem>
                                    <ListItem textDecoration={ad_agency_email !== '' && ad_agency_mobile !== '' ? 'line-through' : ''} color={ad_agency_email !== '' && ad_agency_mobile !== '' ? 'gray.200': ''}>Complete details for the agency</ListItem>
                                    <ListItem textDecoration={location_cord?.Latitude !== '' && location_cord?.Longitude !== '' ? 'line-through' : ''} color={location_cord?.Latitude !== '' && location_cord?.Longitude !== '' ? 'gray.200': ''}>Pin the location for the billboard</ListItem>
                                </UnorderedList>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                : null
            }
            {publish_status ? null :
                <Tooltip label='draft' placement='auto'>
                    <IconButton icon={<MdEditDocument/>} isRound={true} variant='solid' colorScheme='gray' border='1px solid #fff' borderRadius={'full'} cursor={'pointer'}/>
                </Tooltip>
            }
        </VStack>
    </Box>
  )
}