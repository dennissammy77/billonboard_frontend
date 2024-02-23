'use client'
import { GetTransactionStatus } from '@/api/payment/route';
import { Box, Center, Image, Text } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie';

function Page() {
  //const orderTrackingId = 
  const cookies = new Cookies();
  const params = useSearchParams();
  useEffect(()=>{
    const id = params?.get('OrderTrackingId');
    getStatus(id)
  },[]);
  const getStatus=async(id)=>{
    await GetTransactionStatus(id).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Center>
      <Box p='6' alignItems={'center'} textAlign={'center'}>
        <Image alt='image' src='../order_confirmation.jpg' boxSize={400} />
        <Text fontSize='xl' fontWeight='bold'>Success!!</Text>
        <Text my='4'>We are happy for joining our paid plan</Text>
        <Text>You have access to all our exiting features!</Text>
      </Box>
    </Center>
  )
}

export default Page