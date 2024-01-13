import { Badge, Box, Card, CardBody, CardFooter, Flex, HStack, Icon, IconButton, Image, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaInfoCircle, FaStar } from 'react-icons/fa';
import { BsFillPinMapFill } from "react-icons/bs";
import { FaChalkboardUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from 'react-icons/io';
import { dashboardContext } from '@/components/providers/dashboard.context';

export const BoardCard=({board})=>{
    const {name_of_billboard, ad_agency_name,location, bob_rating, img_placeholder,advertisement_data } = {...board}
    const {set_page,set_board_data} = useContext(dashboardContext);
  return (
    <Box w='100%' h='250px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Image src={advertisement_data?.length > 0 && advertisement_data[advertisement_data.length - 1]?.image_url !== ''? advertisement_data[advertisement_data.length - 1]?.image_url: img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'}/>
        <Stack position={'absolute'} bottom={'0'} left={'0'} p='2' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.6), rgba(0,0,0,0.5))" w='full' borderRadius={'md'} cursor={'pointer'} fontSize='xs' transition={'.3s ease-in-out'} _hover={{fontSize:'sm'}}>
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
            {advertisement_data?.length > 0 ? null : 
                <Flex align='center' bg='orange' gap='2' color='#fff' p='1'>
                    <Icon as={FaInfoCircle} boxSize={'4'}/>
                    <Text fontSize={'xs'}>complete this listing</Text>
                </Flex>
            }
        </Stack>
        <VStack position={'absolute'} top='2' right={'2'}>
            <Tooltip label='Add a new board' placement='auto'>
                <IconButton aria-label='Like board' icon={<IoMdAdd />} size='xs' transition={'.3s ease-in-out'} bgColor='#3874ff' _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={(()=>{set_page('New_Side');set_board_data(board)})}/>
            </Tooltip>
            <Tooltip label='view' placement='auto'>
                <IconButton aria-label='Like board' icon={<TbExternalLink />} size='xs' transition={'.3s ease-in-out'} bg='#7183ad' _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={(()=>{set_page('View_Side');set_board_data(board)})}/>
            </Tooltip>
            <Tooltip label='edit' placement='auto'>
                <IconButton aria-label='View board' icon={<FiEdit />} size='xs' transition={'.3s ease-in-out'} bg='#7183ad' _hover={{bgColor:'#3874ff',color:'#fff'}}/>
            </Tooltip>
        </VStack>
    </Box>
  )
}