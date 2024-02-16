import { Badge, Box, HStack, Icon, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { FaChalkboardUser } from "react-icons/fa6";
import { TbExternalLink } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import { UserContext } from '@/components/providers/user.context';

export const AdvertisementCard=({data})=>{
    const view_image_modal = useDisclosure()
    const {image_url,message,billboard_id,brand,season,category} = {...data};
    const router = useRouter();
    const img_placeholder = 'https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'
    const toast = useToast();
    const {user} = useContext(UserContext)
    const handleRoute=()=>{
        if (user){
            router.push(`/billboards/board?query=${billboard_id?._id}`)
        }else{
            toast({title:'You need to be signed in to view advertisement',variant:'left-accent',position:'top-left',status:'warning',isClosable:true})
            return;
        }
    }
  return (
    <Box w='100%' h='250px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Modal isOpen={view_image_modal?.isOpen} onClose={view_image_modal?.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>-</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={image_url ? image_url : img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Image src={image_url ? image_url : img_placeholder} cursor='pointer' w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5' onClick={(()=>{view_image_modal?.onToggle()})}/>
        <Stack position={'absolute'} bottom={'0'} left={'0'} p='2' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.1))" w='full' borderRadius={'md'} cursor={'pointer'} fontSize='xs' transition={'.3s ease-in-out'} _hover={{fontSize:'sm',bg:'#3874ff'}}>
            <HStack>
                <Text>Agency: </Text>
                <Text fontWeight={'bold'}>{billboard_id?.ad_agency_name}</Text>
            </HStack>
            <HStack>
                <Text>Brand: </Text>
                <Badge>{brand}</Badge>
            </HStack>
            <HStack>
                <Text>season:</Text>
                <Text>{season}</Text>
            </HStack>
            <HStack>
                <Text>category:</Text>
                <Text>{category}</Text>
            </HStack>
        </Stack>
        <VStack position={'absolute'} top='2' right={'2'}>
            <IconButton aria-label='View board' icon={<TbExternalLink />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={handleRoute}/>
        </VStack>
    </Box>
  )
}