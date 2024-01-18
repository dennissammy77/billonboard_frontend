'use client'

import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import CardWrapper from './CardWrapper'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

import { MdVisibility,MdVisibilityOff } from "react-icons/md";
import { FormStatus } from './FormStatus';
import { IoWarningOutline } from "react-icons/io5";
import { useTransition } from 'react';
import SignUp from '@/api/auth/signup/route';
import { UserContext } from '@/components/providers/user.context';
import { useRouter } from 'next/navigation';

const SignUpForm=()=>{
  const [first_name, set_first_name]=useState('');
  const [last_name, set_last_name]=useState('');
  const [email, set_email]=useState('');
  const [password, set_password]=useState('');
  const [confirm_password, set_confirm_password]=useState('');
  const [account_type, set_account_type]=useState('admin');
  const [company_email, set_company_email]=useState('');
  const [company_mobile, set_company_mobile]=useState('');
  const [company_name, set_company_name]=useState('');
  
  const [input_error, set_input_error]=useState(false);
  const [isPending, startTransition] = useTransition();
  const {set_user_handler} = useContext(UserContext);
  const router = useRouter()

  const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

  const [form_status_message,set_form_status_message]=useState('');
  const [form_status_status,set_form_status_status]=useState('');

  const payload={
    first_name,
    last_name,
    email,
    password,
    account_type,
    company_email,
    company_mobile,
    company_name
  }
  const Verify_Inputs=()=>{
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (password && first_name && last_name && email && confirm_password){
			if (!email.match(validRegex)){
        set_form_status_message('Use a valid email format e.g example@company.com')
        set_form_status_status('warning');
				return;
			}else if(password !== confirm_password){
        set_form_status_message('You need to provide passwords that match.')
        set_form_status_status('warning');
        return ;
      }else{
				handle_Sign_Up()
			}
		}else{
			set_input_error(true);
      set_form_status_message('required fields need to be filled')
      set_form_status_status('warning');
			return ;
		}
	}
	const handle_Sign_Up=async()=>{
		await SignUp(payload).then((response)=>{
        set_form_status_message('Account created successfully')
        set_form_status_status('success');
        setTimeout(()=>{
          router.push('/')
        },2000)
        set_user_handler(response)
        return ;
    }).catch((err)=>{
        set_form_status_message(`Error in creating your account: ${err?.response?.data}`)
        set_form_status_status('error');
        return ;
    }).finally(()=>{
      set_input_error(false)
    })
	}

  const handleSubmit=()=>{
    startTransition(()=>{
      Verify_Inputs()
    })
  }
  return (
    <CardWrapper
      headerLabel='Create an Account today'
      backButtonLabel='Already have an account?'
      backButtonHref={'/auth/signin'}
      showSocial
    >
      <Flex gap='2'>
        <FormControl mt='1' isRequired isInvalid={input_error && first_name == '' ? true : false}>
          <FormLabel>First name</FormLabel>
          <Input disabled={isPending} type='text' placeholder='john' variant='filled' required onChange={((e)=>{set_first_name(e.target.value)})}/>
          {input_error && first_name == '' ?  <FormErrorMessage>name is required.</FormErrorMessage> : ( null )}
        </FormControl>
        <FormControl mt='1' isRequired isInvalid={input_error && last_name == '' ? true : false}>
          <FormLabel>Last name</FormLabel>
          <Input disabled={isPending} type='email' placeholder='doe' variant='filled' required onChange={((e)=>{set_last_name(e.target.value)})}/>
          {input_error && last_name == '' ?  <FormErrorMessage>name is required.</FormErrorMessage> : ( null )}
        </FormControl> 
      </Flex>
      <FormControl mt='1' isRequired isInvalid={input_error && email == '' ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input disabled={isPending} type='email' placeholder='johndoe@email.com ' variant='filled' required onChange={((e)=>{set_email(e.target.value)})}/>
        {input_error && email == '' ?  <FormErrorMessage>email is required.</FormErrorMessage> : ( null )}
      </FormControl>
      <FormControl mt='1' isRequired isInvalid={input_error && password == '' ? true : false}>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input disabled={isPending} pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_password(e.target.value)})} />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'> {show ? <MdVisibilityOff/> : <MdVisibility/>} </Button>
          </InputRightElement>
        </InputGroup>
        {input_error && password == '' ?  <FormErrorMessage>password is required.</FormErrorMessage> : ( null )}
      </FormControl>
      <FormControl mt='1' isRequired isInvalid={input_error && password == '' ? true : false}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input disabled={isPending} pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Confirm password' variant='filled' required onChange={((e)=>{set_confirm_password(e.target.value)})} />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'> {show ? <MdVisibilityOff/> : <MdVisibility/>} </Button>
          </InputRightElement>
        </InputGroup>
        {input_error && confirm_password == '' ?  <FormErrorMessage>you need to confirm your password.</FormErrorMessage> : ( null )}
      </FormControl>
      <FormStatus message={form_status_message} status={form_status_status}/>
      {isPending?
        <Button isLoading loadingText='creating your account' variant='ghost' borderRadius={'md'} w='full'/>
        :
        <Button variant={'filled'} borderRadius={'md'} bg='#05232e' mt='2' w='full' color='#fff' onClick={handleSubmit}>SignUp</Button>
      }
    </CardWrapper>
  )
}

export default SignUpForm