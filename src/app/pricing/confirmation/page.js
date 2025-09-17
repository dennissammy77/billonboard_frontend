'use client'
import { GetTransactionStatus } from '@/api/payment/route';
import useFetchUserData from '@/components/hooks/useFetchUserData.hook';
import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';

function Page() {
  const router = useRouter()
  const params = useSearchParams();
  const [data,set_data]=useState('loading');
  
  useEffect(()=>{
    const id = params?.get('OrderTrackingId');
    getStatus(id)
  },[]);
  const getStatus=async(id)=>{
    const data = await useFetchUserData();
    await GetTransactionStatus(id,data?.email).then((res)=>{
      if(res.data?.payment_status_description === 'Failed'){
        set_data('Failed')
      }else if(res.data?.payment_status_description === 'Completed'){
        set_data('Completed')
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Center>
        {data === 'loading'? <Loading_page/> : null}
        {data === 'Failed'? <Error_page/> : null}
        {data === 'Completed'? <Success_page/> : null}
      </Center>
    </Suspense>
    
  )
}

export default Page;

const Loading_page=()=>{
  const router = useRouter()
  return(
    <Box p='6' alignItems={'center'} textAlign={'center'}>
      <Text fontSize='xl' fontWeight='bold'>Loading...!!</Text>
      <Text my='4'>Wait as we fetch your transaction status</Text>
      <Flex gap='2'>
        <Button rightIcon={<FaLongArrowAltRight/>} bg='#3874ff' color='white' my='4' onClick={(()=>{router.push('/')})}>Go to HomePage</Button>
        <Button rightIcon={<HiOutlineRefresh/>} bg='gray.700' color='white' my='4' onClick={(()=>{router.push('/pricing')})}>try again</Button>
      </Flex>
    </Box>
  )
}

const Success_page=()=>{
  const router = useRouter()
  return(
    <Box p='6' alignItems={'center'} textAlign={'center'}>
      <Image alt='image' src='../order_confirmation.jpg' boxSize={400} />
      <Text fontSize='xl' fontWeight='bold'>Success!!</Text>
      <Text my='4'>We are happy for joining our paid plan</Text>
      <Text>You have access to all our exiting features!</Text>
      <Button rightIcon={<FaLongArrowAltRight/>} bg='#3874ff' color='white' my='4' onClick={(()=>{router.push('/')})}>Go to HomePage</Button>
    </Box>
  )
}

const Error_page=()=>{
  const router = useRouter()
  return(

    <Box p='6' alignItems={'center'} textAlign={'center'}>
      <Image alt='image' src='../error.jpg' boxSize={400} />
      <Text fontSize='xl' fontWeight='bold'>Something went wrong!!</Text>
      <Text my='4'>We are sad that the payment failed</Text>
      <Text>Try again in a few moments!</Text>
      <Flex gap='2'>
        <Button rightIcon={<FaLongArrowAltRight/>} bg='#3874ff' color='white' my='4' onClick={(()=>{router.push('/')})}>Go to HomePage</Button>
        <Button rightIcon={<HiOutlineRefresh/>} bg='gray.700' color='white' my='4' onClick={(()=>{router.push('/pricing')})}>try again</Button>
      </Flex>
    </Box>
  )
}