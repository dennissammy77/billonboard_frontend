'use client'

import NewUserApi from '@/api/auth/client/admin/user/route';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { FormStatus } from '@/components/ui/auth/FormStatus';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, Icon, HStack, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, InputRightElement, Select, useFormControlStyles,} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext, useState, useTransition } from 'react';

export const NewUser=({view_drawer_disclosure})=>{
    const {set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const [first_name, set_first_name]=useState('');
    const [last_name, set_last_name]=useState('');
    const [email, set_email]=useState('');
    const [position, set_position]=useState('');
    const [password, set_password]=useState('admin.password.co.ke');
    const [account_type, set_account_type]=useState('admin');
    
    const [input_error, set_input_error]=useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [form_status_message,set_form_status_message]=useState('');
    const [form_status_status,set_form_status_status]=useState('');

    const payload={
        first_name,
        last_name,
        email,
        password,
        account_type,
        position,
    }

    const Verify_Inputs=()=>{
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (password && first_name && last_name && email){
            if (!email.match(validRegex)){
                set_form_status_message('Use a valid email format e.g example@company.com')
                set_form_status_status('warning');
                return;
            }
            if(user?.position == 'MANAGER' || user?.position == 'SUPER ADMIN'){
                handle_Create_New_User()
            }else{
                set_form_status_message('You are not authorized to created a new user. Contact support incase of any issues.')
                set_form_status_status('warning');
                return;
            }
        }else{
            set_input_error(true);
            set_form_status_message('required fields need to be filled')
            set_form_status_status('warning');
            return ;
        }
    }
    const handle_Create_New_User=async()=>{
        await NewUserApi(payload).then((response)=>{
            set_form_status_message('Account created successfully')
            set_form_status_status('success');
            view_drawer_disclosure?.onClose()
            return ;
        }).catch((err)=>{
            set_form_status_message(`Error in creating account: ${err?.response?.data}`)
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
    const clean_Inputs=()=>{
        set_first_name('')
        set_last_name('')
        set_position('')
        set_email('')
        set_input_error(false)
    }
    return(
        <Drawer
            isOpen={view_drawer_disclosure?.isOpen}
            placement='right'
            onClose={view_drawer_disclosure?.onClose}
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>New User</DrawerHeader>

            <DrawerBody mt='10px' p='4'>
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
                <FormControl mt='1' isRequired isInvalid={input_error && position == '' ? true : false}>
                    <Select placeholder='Select the role for the user' onChange={((e)=>{set_position(e.target.value)})} my='4'>
                        <option value='MANAGER'>Manager</option>
                        <option value='DEVELOPER'>Developer</option>
                        <option value='SALES'>Sales</option>
                        <option value='MARKETING'>Marketing</option>
                        <option value='SUPER ADMIN'>Super Admin</option>
                    </Select>
                    {input_error && position == '' ?  <FormErrorMessage>The Role is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormStatus message={form_status_message} status={form_status_status}/>
            </DrawerBody>
            <DrawerFooter>
                {isPending?
                    <Button isLoading loadingText='creating account' variant='ghost' borderRadius={'md'}/>
                    :
                    <Button variant={'filled'} borderRadius={'md'} bg='#05232e' color='#fff' onClick={handleSubmit}>Save</Button>
                }
                <Button variant='outline' ml={3} onClick={view_drawer_disclosure?.onClose}>
                    Close
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

