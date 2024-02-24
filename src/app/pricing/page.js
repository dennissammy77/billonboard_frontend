'use client';

import PaymentHandler from '@/api/payment/route';
import { UserContext } from '@/components/providers/user.context';
import { Box, Button, Flex, HStack, Icon, Text, VStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { IoCheckmark } from 'react-icons/io5';
import { Cookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

function Page() {
  const {user}=useContext(UserContext);
  const toast = useToast();
  const [amount,set_amount]=useState(0);
  const router = useRouter();
  const cookies = new Cookies();
  const uid = (`(${user?._id})`+ uuidv4());

  const HandleUpgrade=async()=>{
    if (!user){
      return toast({title:'Error! could not perform action.',description:'You need to be signed in to upgrade your account!',status:'error',isClosable:true,variant:'left-accent',position:'top-left'})
    }
    const payload={
      id: uid.slice(0,49),
      email: user?.email,
      amount: amount,
      description: 'description',
      mobile: user?.mobile,
      first_name: user?.first_name,
      last_name: user?.last_name,
    }
    await PaymentHandler(payload).then((res)=>{
      console.log(res.data);
      cookies.set('order_tracking_id', res?.data?.order_tracking_id, { path: '/' });
      router.push(res?.data?.redirect_url);
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Flex bg="#fff" p={10} w="full" justifyContent="center" alignItems="center">
    <Box w="full" pt={8}>
      <Flex direction={{ base: "column", md: "row", }} justifyContent="center" mb={{ base: 6, sm: 0, }} >
        <Flex flex={{ sm: 1, lg: "initial",}}w={{lg: 2.3 / 7 }} rounded="lg" borderTopRightRadius={0} borderBottomLeftRadius="lg" bg="white" my={6} direction="column">
          <VStack spacing={1} justifyContent="center" p={8} textAlign="center" w="full" shadow="xl" bg='#b7c7ed'>
            <Text fontSize="3xl" fontWeight="bold">
              Hobby
            </Text>
            <HStack spacing={3}>
              <Text fontWeight="bold" fontSize="6xl" textShadow="2px 0 currentcolor"> $79</Text>
              <Text alignSelf="center" fontSize="3xl">/month</Text>
            </HStack>
          </VStack>
          <VStack fontSize="sm" spacing={8} h="full" bg="#445d96" borderBottomLeftRadius="lg" p={12}>
            <VStack spacing={4} w="full" direction="column" alignItems="start">
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Suppression Management</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Email Tracking and Analytics</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">99.99% Guaranteed Uptime SLA</Text>
                </Flex>
            </VStack>
            <Button w='full' onClick={(()=>{set_amount(1);HandleUpgrade()})}>Get started</Button>
          </VStack>
        </Flex>
        <Flex flex={{ sm: 1, lg: "initial",}}w={{lg: 2.3 / 7 }} rounded="lg" borderTopRightRadius={0} borderBottomLeftRadius="lg" bg="white" my={6} direction="column" mx={{base:'0',md:'2'}}>
          <VStack spacing={1} justifyContent="center" p={8} textAlign="center" w="full" shadow="xl" bg='#b7c7ed'>
            <Text fontSize="3xl" fontWeight="bold">
                Growth
            </Text>
            <HStack spacing={3}>
              <Text fontWeight="bold" fontSize="6xl" textShadow="2px 0 currentcolor"> $149</Text>
              <Text alignSelf="center" fontSize="3xl">/month</Text>
            </HStack>
          </VStack>
          <VStack fontSize="sm" spacing={8} h="full" bg="#445d96" borderBottomLeftRadius="lg" p={12}>
            <VStack spacing={4} w="full" direction="column" alignItems="start">
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Suppression Management</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Email Tracking and Analytics</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">99.99% Guaranteed Uptime SLA</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">1,000 Email Address Validations</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">99.99% Guaranteed Uptime SLA</Text>
                </Flex>
            </VStack>
            <Button w='full'>Get started</Button>
          </VStack>
        </Flex>
        <Flex flex={{ sm: 1, lg: "initial",}}w={{lg: 2.3 / 7 }} rounded="lg" borderTopRightRadius={0} borderBottomLeftRadius="lg" bg="white" my={6} direction="column">
          <VStack spacing={1} justifyContent="center" p={8} textAlign="center" w="full" shadow="xl" bg='#b7c7ed'>
            <Text fontSize="3xl" fontWeight="bold">
                Growth
            </Text>
            <HStack spacing={3}>
              <Text fontWeight="bold" fontSize="6xl" textShadow="2px 0 currentcolor"> $149</Text>
              <Text alignSelf="center" fontSize="3xl">/month</Text>
            </HStack>
          </VStack>
          <VStack fontSize="sm" spacing={8} h="full" bg="#445d96" borderBottomLeftRadius="lg" p={12}>
            <VStack spacing={4} w="full" direction="column" alignItems="start">
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Suppression Management</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">Email Tracking and Analytics</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">99.99% Guaranteed Uptime SLA</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">1,000 Email Address Validations</Text>
                </Flex>
                <Flex alignSelf="start" w="full">
                    <Icon boxSize={5} mt={1} mr={2} viewBox="0 0 20 20" fill="currentColor" as={IoCheckmark}/>
                    <Text fontSize="lg" color="#fff">99.99% Guaranteed Uptime SLA</Text>
                </Flex>
            </VStack>
            <Button w='full'>Get started</Button>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  </Flex>
  )
};

export default Page;