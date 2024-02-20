'use client'

import SendEmailOtp from '@/api/auth/password/Otp/route';
import { Generate_Otp } from '@/components/hooks/useHandleOtp.hook';

import { UserContext } from '@/components/providers/user.context'
import { Button, Flex, HStack, Heading, Input, InputGroup, InputRightElement, PinInput, PinInputField, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

function Page() {
    const {user,set_user_handler} = useContext(UserContext);
    const router = useRouter();
    const toast = useToast()
	const query = router?.query?.email;


    const [active,set_active]=useState(true);
    const [code_active,set_code_active]=useState(false);

    const [email,set_email]=useState(query);
    const [new_password,set_new_password]=useState('');
    const [confirm_password,set_confirm_password]=useState('');

    const [confirmation_code,set_confirmation_code]=useState();

    const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

    const [input_error,set_input_error]=useState(false);

    const handle_otp=async()=>{
        if(!email){
		 return toast({ title: 'Error!:No input', description: `enter your email `, status: 'error', variant:'left-accent', position: 'top-left', isClosable: true });
        }
		const code = await Generate_Otp();
        console.log(code)
		if (code){
            const payload = {
                code,
                email
            }
			const email_status = await SendEmailOtp(payload);
            //const email_status = '';
			if (email_status?.data == 'success'){
				set_code_active(!code_active)
				return 'success'
			}
			return null;
		}
		return null;
	}
	
	const Compare_Codes=()=>{
		// const otp_status = Verify_otp(confirmation_code);
		// if(otp_status === 'error'){
		// 	toast({ title: 'Code verification error', description: `the code you entered does not match `, status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
		// 	return ;
		// }
		// set_active(!active);
  	}
	
  	const Set_New_Password=async()=>{
  		// const payload = {
  		// 	email : email,
  		// 	password : new_password
  		// }
  		// if (new_password == confirm_password){
  		// 	await Password_Reset(payload).then(()=>{
		// 		toast({ title: 'Password has been changed successfully', description: 'Sign in again to your account', status: 'success', variant:'left-accent', position: 'top-left', isClosable: true });
		// 		useLogOut()
		// 		set_user_handler(`${user?._id} logged out `)
		// 		setTimeout(()=>{
		// 			router.push('/')
		// 		},2000);
        //         return ;
		// 	}).catch((err)=>{
		// 		console.log(err);
        //         return ;
		// 	})
  		// }else{
		// 	toast({ title: 'Passwords do not match', description: '', status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
        //     return ;
  		// }
  	}

    return (
    <Flex direction='column' alignItems={'center'} justify={'center'} w='full'>
        <Heading as='h3' >Forgot password?</Heading>
        {active?
            <Flex direction='column' gap='3' mt='3'>
                {code_active?
                    <Text>Enter the code to change your password.</Text>
                    :
                    <Text>Enter email to receive the code to change your password.</Text>
                }
                {code_active?
                    <Flex direction='column' gap='2'>
                        <HStack>
                            <PinInput type='number' onChange={((e)=>{set_confirmation_code(e)})} otp={true}>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                                <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                            </PinInput>
                        </HStack>
                        <Flex gap='2'>
                            <Button bg='#000' color='#fff' flex='1' onClick={(()=>{set_code_active(!code_active)})}>Resend Code</Button>
                            <Button bg='' flex='1' color='#fff' onClick={Compare_Codes}>Verify Code</Button>
                        </Flex>
                    </Flex>
                :
                    <Flex direction='column' gap='2'>
                        <Input value={email} variant='filled' bg='#eee' required type='email' placeholder='Enter your email' onChange={((e)=>{set_email(e.target.value)})}/>
                        <Button bg='#000' color='#fff' onClick={handle_otp}>Send Email</Button>
                    </Flex>
                }
                
            </Flex>
            :
            <>
                <Text>Enter your new password for your account.</Text>
                <Flex direction='column' gap='2' w='80%'>
                    <Text>New Password</Text>
                    <InputGroup size='md'>
                        <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_new_password(e.target.value)})} />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
                            {show ? <MdVisibilityOff/> : <MdVisibility/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Text>Confirm new password</Text>
                    <InputGroup size='md'>
                        <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_confirm_password(e.target.value)})} />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
                            {show ? <MdVisibilityOff/> : <MdVisibility/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button bg='#009393' color='#fff' onClick={Set_New_Password}>Set New Password</Button>
                </Flex>
            </>
        }
    </Flex>
    )
}

export default Page