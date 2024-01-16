'use client'

import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Tooltip, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react";
//import Update_Client from "../../api/auth/client/edit_client";
import { UserContext } from "@/components/providers/user.context";
import UpdateUser from "@/api/auth/client/update/route";

export const Manage=({set_profile_edit})=>{
    const toast = useToast();
	const {user, set_user_handler} = useContext(UserContext);
    
    const [first_name,set_first_name]=useState(user?.first_name);
    const [last_name,set_last_name]=useState(user?.last_name);
    const [user_name,set_user_name]=useState(user?.user_name);
    const [mobile,set_mobile]=useState(user?.mobile);
    const [address,set_address]=useState(user?.address);
    const [company_name,set_company_name]=useState(user?.company_name);
    const [company_address,set_company_address]=useState(user?.company_address);
    const [company_email,set_company_email]=useState(user?.company_email);
    const [company_mobile,set_company_mobile]=useState(user?.company_mobile);
    const [position,set_position]=useState(user?.position);
    const [gender,set_gender]=useState(user?.gender);

    const [saving,set_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const payload = {
        _id: user?._id,
        first_name,
        last_name,
        user_name,
        mobile,
        email: user?.email,
        address,
        company_name,
        company_address,
        company_email,
        company_mobile,
        position,
        gender
    }
    const handle_Edit=async()=>{
        set_saving(true)
        if (!first_name || !last_name || !mobile ){
            toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_saving(false)
        }else{
            await UpdateUser(payload).then((res)=>{
                toast({ title: 'Account updated successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
                set_profile_edit(false)
                set_user_handler(res);
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Account updated failed', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
                set_saving(false)
            })
        }
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Company details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>
                    <FormLabel>Name of the agency</FormLabel>
                    <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                    {input_error && company_name.trim().length == 0 ? <FormErrorMessage>The name of your agency is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && company_email.trim().length == 0 ? true : false}>
                    <FormLabel>Agency Email</FormLabel>
                    <Input placeholder={company_email? company_email : '-'} type='email' onChange={((e)=>{set_company_email(e.target.value)})}/>
                    {input_error && company_email.trim().length == 0 ? <FormErrorMessage>Email for the agency is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && company_mobile.trim().length == 0 ? true : false}>
                    <FormLabel>Agency Mobile</FormLabel>
                    <Input type='tel' placeholder={company_mobile} onChange={((e)=>{set_company_mobile(e.target.value)})}/>
                    {input_error && company_mobile.trim().length == 0 ? <FormErrorMessage>mobile of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Address for the company</FormLabel>
                    <Input type='text' placeholder={company_address} onChange={((e)=>{set_company_address(e.target.value)})}/>
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>What is your position in the agency</FormLabel>
                    <Input type='text' placeholder={position} onChange={((e)=>{set_position(e.target.value)})}/>
                </FormControl>
            </Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>User details</Text>
                <Divider/>
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
            </Box>
            <Box mt='2' align='end' gap='2'>
                <Tooltip hasArrow label='Save account details'  placement='auto'>
                {saving? (<Button isLoading loadingText='Saving...' colorScheme='teal' variant='outline' />) : ( <Button ml={'2'} bg='#3874ff' color='#fff' onClick={handle_Edit}>Save profile</Button>)}
                </Tooltip>
            </Box>
        </Box>
    )
}