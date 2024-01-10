import { Badge, Box, Card, CardBody, CardFooter, HStack, Icon, IconButton, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { BsFillPinMapFill } from "react-icons/bs";
import { FaChalkboardUser } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";

export const BoardCard=()=>{
  return (
    <Box w='100%' h='250px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Image src='../billboard/IMG_0780.JPG' w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'}/>
        <Stack position={'absolute'} bottom={'0'} left={'0'} p='2' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0))" w='full' borderRadius={'md'} fontSize={'small'} cursor={'pointer'} transition={'.3s ease-in-out'} _hover={{fontSize:'md'}}>
            <Text>Name of Billboard</Text>
            <HStack>
                <Icon boxSize={4} as={FaChalkboardUser}/>
                <Text>Alliance Media</Text>
            </HStack>
            <HStack>
                <Icon boxSize={4} as={BsFillPinMapFill}/>
                <Text>Along Muranga road</Text>
            </HStack>
            <HStack color='#3874ff'>
                <Icon boxSize={4} as={FaStar}/>
                <Badge bgColor={'#3874ff'} color={'#fff'}>3/5</Badge>
            </HStack>
        </Stack>
        <VStack position={'absolute'} top='2' right={'2'}>
            <IconButton aria-label='Like board' icon={<TbExternalLink />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}}/>
            <IconButton aria-label='View board' icon={<AiFillLike />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}}/>
        </VStack>
    </Box>
  )
}