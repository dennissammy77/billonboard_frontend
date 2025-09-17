'use client'

import React, { Suspense, useContext, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Icon, Input, InputGroup, InputRightElement, PinInput, PinInputField, Text, useToast } from '@chakra-ui/react'
import { CiWarning } from 'react-icons/ci';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter, useSearchParams } from 'next/navigation';
import { SEND_OTP_CODE_TO_USER } from '@/api/auth/password/route';


function PageContent() {
    const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const searchParams = useSearchParams()
    const email_query = searchParams.get('email');

    const schema = yup.object().shape({
        email: yup.string().email().required().matches(EmailRegex, 'Email address must be of correct format'),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            email: email_query
        }
    });
    const router = useRouter();
    const toast = useToast();
	
      const onSubmit = async(data) => {
        try {
          await SEND_OTP_CODE_TO_USER(data?.email).then((response)=>{
                if(response?.data?.error === true){
                    return toast({ title: `Error!:${response?.data?.message}`, description: ``, status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
                }
                toast({ title: 'Success!:Code sent successfully', description: ``, status: 'success', variant:'left-accent', position: 'top-left', isClosable: true });
                setTimeout(()=>{
                    router.push(`/auth/password_reset/verify_code?email=${data?.email}`);
                },2000)
                return ;
          }).catch((err)=>{
              return toast({ title: `Error occured!:`, description: ``, status: 'error', variant:'left-accent', position: 'top-left', isClosable: true });
          })
        } catch (error){
            return toast({ title: `Error occured!:`, description: ``, status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
        }
    }

    return (
        <Flex direction='column' alignItems={'center'} justify={'center'} w='full' boxShadow={'sm'} p='4'>
            <Text fontSize={'xl'} my='4'>Forgot your password?</Text>
            {/**Email input to send code to */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my='4' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input disabled={isSubmitting} {...register('email')} type='email' placeholder='johndoe@gmail.com' variant='filled'/>
                    {errors.email && ( <Text fontSize={'sm'} color='red'>{errors.email.message}</Text>)}
                </FormControl>
                {errors.root && 
                    <HStack color='#fff' bg='red.200' borderRadius={'md'} p='2' mt='2' align={'center'}>
                        <Icon as={CiWarning} boxSize='4'/>
                        <Text>{errors.root.message}</Text>
                    </HStack>
                }
                {isSubmitting?
                    <Button isLoading loadingText='sending code to this email...' variant='ghost' borderRadius={'md'} w='full'/>
                    :
                    <Button type='submit' variant={'filled'} borderRadius={'md'} bg='#05232e' mt='2' w='full' color='#fff' onClick={handleSubmit}>Receive Code</Button>
                }
            </form>
        </Flex>        
    )
}

export default function Page(){
    return(
        <Suspense fallback={<div>Loading ...</div>}>
            <PageContent/>
        </Suspense>
    )
}