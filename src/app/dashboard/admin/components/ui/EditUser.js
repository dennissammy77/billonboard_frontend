'use client'

import UpdateUser from '@/api/auth/client/update/route';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, Icon, HStack, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, InputRightElement, Select, useFormControlStyles, useToast, Divider, Switch,} from '@chakra-ui/react';

import { useContext, useState, useTransition } from 'react';

export const EditUser=({view_drawer_disclosure,data})=>{
    const {set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const toast = useToast();
    
    const [first_name,set_first_name]=useState(data?.first_name);
    const [last_name,set_last_name]=useState(data?.last_name);
    const [user_name,set_user_name]=useState(data?.user_name);
    const [mobile,set_mobile]=useState(data?.mobile);
    const [address,set_address]=useState(data?.address);
    const [gender,set_gender]=useState(data?.gender);
    const [company_name,set_company_name]=useState(data?.company_name);
    const [company_email,set_company_email]=useState(data?.company_email);
    const [company_mobile,set_company_mobile]=useState(data?.company_mobile);
    const [company_address,set_company_address]=useState(data?.company_address);
    const [verified_email_status,set_verified_email_status]=useState(data?.verified_email_status);
    const [verification_status,set_verification_status]=useState(data?.verification_status);
    const [account_suspension_status,set_account_suspension_status]=useState(data?.account_suspension_status);
    const [account_susbscription_status,set_account_susbscription_status]=useState(data?.account_susbscription_status);
    const [account_susbscription_model,set_account_susbscription_model]=useState(data?.account_susbscription_model);
    const [position, set_position]=useState(data?.position);
    const [account_type, set_account_type]=useState(data?.account_type);

    const [password, set_password]=useState('admin.password.co.ke');
    
    const [input_error, set_input_error]=useState(false);
    const [isPending, startTransition] = useTransition();

    const payload={
        _id: data?._id,
        first_name,
        last_name,
        user_name,
        account_type,
        gender,
        email: data?.email,
        address,
        mobile,
        company_name,
        company_email,
        company_mobile,
        company_address,
        position,
        verified_email_status,
        verification_status,
        account_suspension_status,
        account_susbscription_status,
        account_susbscription_model,
    }

    const handle_Edit=async()=>{
        if (!first_name || !last_name || !mobile){
            toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_input_error(true);
            return ;
        }
        if(user?.position == 'MANAGER' || user?.position == 'SUPER ADMIN'){
            await UpdateUser(payload).then((res)=>{
                toast({ title: 'Account updated successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
                view_drawer_disclosure?.onClose()
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Account updated failed', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
            })
        }else{
            toast({ title: '!Error!', description: 'You are not authorized to update users. Contact support incase of any issues.', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }
    }

    const handleSubmit=()=>{
        startTransition(()=>{
            handle_Edit()
        })
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
            <DrawerHeader>Edit User</DrawerHeader>

            <DrawerBody mt='10px' p='4'>
                <FormControl mt='2' isRequired isInvalid={input_error && first_name.trim().length == 0 ? true : false}>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder={first_name? first_name : '-'} type='text' onChange={((e)=>{set_first_name(e.target.value)})}/>
                    {input_error && first_name.trim().length == 0 ? <FormErrorMessage>First name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && last_name.trim().length == 0 ? true : false}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder={last_name? last_name : '-'} type='text' onChange={((e)=>{set_last_name(e.target.value)})}/>
                    {input_error && last_name.trim().length == 0 ? <FormErrorMessage>Last name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && user_name.trim().length == 0 ? true : false}>
                    <FormLabel>User name</FormLabel>
                    <Input placeholder={user_name? user_name : '-'} type='text' onChange={((e)=>{set_user_name(e.target.value)})}/>
                    {input_error && user_name.trim().length == 0 ? <FormErrorMessage>User name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && mobile.trim().length == 0 ? true : false}>
                    <FormLabel>Mobile</FormLabel>
                    <Input type='tel' placeholder={mobile} onChange={((e)=>{set_mobile(e.target.value)})}/>
                    {input_error && mobile.trim().length == 0 ? <FormErrorMessage>mobile of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' placeholder={address} onChange={((e)=>{set_address(e.target.value)})}/>
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Gender</FormLabel>
                    <Select variant='filled' placeholder='Select Gender' onChange={((e)=>{set_gender(e.target.value)})}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='I would rather not say'>I would rather not say</option>
                    </Select>
                </FormControl>
                {data?.account_type === 'admin'?
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
                    :
                    <FormControl mt='2'>
                        <FormLabel>What is the position in the company</FormLabel>
                        <Input type='text' placeholder={position} onChange={((e)=>{set_position(e.target.value)})}/>
                    </FormControl>
                }
                {data?.account_type === 'agency'? 
                    <>
                        {/**<FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Name of the agency</FormLabel>
                            <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                            {/*{input_error && company_name.trim().length == 0 ? <FormErrorMessage>The name of your agency is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_email.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Agency Email</FormLabel>
                            <Input placeholder={company_email? company_email : '-'} type='email' onChange={((e)=>{set_company_email(e.target.value)})}/>
                            {/*{input_error && company_email.trim().length == 0 ? <FormErrorMessage>Email for the agency is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_mobile.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Agency Mobile</FormLabel>
                            <Input type='tel' placeholder={company_mobile} onChange={((e)=>{set_company_mobile(e.target.value)})}/>
                            {/*{input_error && company_mobile.trim().length == 0 ? <FormErrorMessage>mobile of the company is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Address for the company</FormLabel>
                            <Input type='text' placeholder={company_address} onChange={((e)=>{set_company_address(e.target.value)})}/>
                        </FormControl>
                    </>
                : null}
                {data?.account_type === 'client' || data?.account_type === 'footsoldier'? 
                    <>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Name of the company</FormLabel>
                            <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                            {/**{input_error && company_name.trim().length == 0 ?  <FormErrorMessage>Name of the company is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_email.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Email of the company</FormLabel>
                            <Input placeholder={company_email? company_email : '-'} type='text' onChange={((e)=>{set_company_email(e.target.value)})}/>
                            {/*{input_error && company_email.trim().length == 0 ?  <FormErrorMessage>Name of the company is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_mobile.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Mobile of the company</FormLabel>
                            <Input placeholder={company_mobile? company_mobile : '-'} type='text' onChange={((e)=>{set_company_mobile(e.target.value)})}/>
                            {/*{input_error && company_mobile.trim().length == 0 ?  <FormErrorMessage>Mobile of the company is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                        {/*<FormControl mt='2' isRequired isInvalid={input_error && company_address.trim().length == 0 ? true : false}>*/}
                        <FormControl mt='2'>
                            <FormLabel>Address of the company</FormLabel>
                            <Input placeholder={company_address? company_address : '-'} type='text' onChange={((e)=>{set_company_address(e.target.value)})}/>
                            {/*{input_error && company_address.trim().length == 0 ?  <FormErrorMessage>Address of the company is required.</FormErrorMessage> : ( null )}*/}
                        </FormControl>
                    </>
                : null}
                {data?.account_type === 'admin'?
                    null :
                    <>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Verification status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='verification' mb='0'>
                                    {verification_status? 'Un Verify user' : 'Verify User'}
                                </FormLabel>
                                <Switch id='verification' onChange={(()=>{set_verification_status(!verification_status)})}/>
                            </FormControl>
                        </Box>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>verified email status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='verification' mb='0'>
                                    {verified_email_status? 'Unverify user email' : 'Verify user email account'}
                                </FormLabel>
                                <Switch id='verification' onChange={(()=>{set_verified_email_status(!verified_email_status)})}/>
                            </FormControl>
                        </Box>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Suspension status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='suspension' mb='0'>
                                    {account_suspension_status? 'Activate User acoount' : 'Suspend user account'}
                                </FormLabel>
                                <Switch id='suspension' onChange={(()=>{set_account_suspension_status(!account_suspension_status)})}/>
                            </FormControl>
                        </Box>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Subscription status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='subscription' mb='0'>
                                    {account_susbscription_status? 'Remove Subscription' : 'Activate subscription'}
                                </FormLabel>
                                <Switch id='subscription' onChange={(()=>{set_account_susbscription_status(!account_susbscription_status)})}/>
                            </FormControl>
                        </Box>
                    </>
                }
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

