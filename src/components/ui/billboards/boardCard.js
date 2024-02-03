import { Badge, Box, HStack, Icon, IconButton, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { BsFillPinMapFill } from "react-icons/bs";
import { FaChalkboardUser } from "react-icons/fa6";
import { TbExternalLink } from "react-icons/tb";
import { useRouter } from 'next/navigation';

export const BoardCard=({board})=>{
    const {name_of_billboard, ad_agency_name,location, bob_rating, img_placeholder,advertisement_data } = {...board};
    const router = useRouter()
  return (
    <Box w='100%' h='250px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Image src={advertisement_data?.length > 0 && advertisement_data[advertisement_data.length - 1]?.image_url !== ''? advertisement_data[advertisement_data.length - 1]?.image_url: img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
        <Stack position={'absolute'} bottom={'0'} left={'0'} p='2' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.1))" w='full' borderRadius={'md'} cursor={'pointer'} fontSize='xs' transition={'.3s ease-in-out'} _hover={{fontSize:'sm'}}>
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
        </Stack>
        <VStack position={'absolute'} top='2' right={'2'}>
            <IconButton aria-label='View board' icon={<TbExternalLink />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={(()=>{router.push(`/billboards/board?query=${board?._id}`)})}/>
        </VStack>
    </Box>
  )
}