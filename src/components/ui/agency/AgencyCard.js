import { Badge, Box, Card, CardBody, CardFooter, HStack, Icon, IconButton, Image, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AiFillLike } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import { UserContext } from '@/components/providers/user.context';
import { ViewUser } from '@/app/dashboard/admin/components/ui/ViewUser';

export const AgencyCard=({agency})=>{
    const router = useRouter()
    const {company_name, profile_photo_url, _id} = {...agency}
    const {user} = useContext(UserContext);
    const view_drawer_disclosure = useDisclosure();
  return (
    <Box w='100%' h='250px' borderRadius={'md'} boxShadow={'md'} position={'relative'}>
        <Image src={profile_photo_url} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
        <Stack position={'absolute'} bottom={'0'} left={'0'} p='2' color="white" bgGradient="linear(to-t,rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.1))" w='full' borderRadius={'md'} cursor={'pointer'} fontSize='xs' transition={'.3s ease-in-out'} _hover={{fontSize:'sm'}}>
            <Text fontSize={'xl'}>{company_name}</Text>
        </Stack>
        <VStack position={'absolute'} top='2' right={'2'}>
            {user?.account_type === 'admin'?
              <>
                <ViewUser view_drawer_disclosure={view_drawer_disclosure} data={agency}/>
                <IconButton aria-label='View board' icon={<TbExternalLink />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={(()=>{view_drawer_disclosure.onToggle()})}/>
              </>
              :
              <IconButton aria-label='View board' icon={<TbExternalLink />} size='sm' transition={'.3s ease-in-out'} _hover={{bgColor:'#3874ff',color:'#fff'}} onClick={(()=>{router.push(`/billboards/board?query=${_id}`)})}/>
            }
        </VStack>
    </Box>
  )
}