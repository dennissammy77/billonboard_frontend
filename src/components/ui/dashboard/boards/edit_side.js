import { dashboardContext } from '@/components/providers/dashboard.context'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react';
import {storage} from '../../../lib/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import EditBoard from '@/api/billboards/board/edit/route.js';

export const Editside=()=>{
    const {side_board_data,board_data,set_page} = useContext(dashboardContext)
    const DiscardDialog = useDisclosure();
    const toast = useToast() 

    const [brand, set_brand]=useState(side_board_data?.brand);
    const [message, set_message]=useState(side_board_data?.message);
    const [catch_phrase, set_catch_phrase]=useState(side_board_data?.catch_phrase);
    const [call_to_action, set_call_to_action]=useState(side_board_data?.call_to_action);
    const [side_ref_Id,set_side_ref_Id]=useState(side_board_data?.side_ref_Id)
    const [season,set_season]=useState(side_board_data?.seaason);
    const [category,set_category]=useState(side_board_data?.category)
    const [orientation,set_orientation]=useState(side_board_data?.orientation)
    const [email_contact,set_email_contact]=useState(side_board_data?.email_contact)
    const [mobile_contact,set_mobile_contact]=useState(side_board_data?.mobile_contact)
    const [address,set_address]=useState(side_board_data?.address)
    const [website,set_website]=useState(side_board_data?.website)
    const [from_date,set_from_date]=useState(side_board_data?.from_date)
    const [to_date,set_to_date]=useState(side_board_data?.to_date)
    const [image_file,set_image_file]=useState('');
    const [image_url,set_image_url]=useState(side_board_data?.image_url);

    const [input_error,set_input_error]=useState(false);
    const [is_saving,set_is_saving]=useState(false);

    const [is_data_saved,set_is_data_saved]=useState(false);


    const HandleImageUpload=async(board_id)=>{
        /**handles uploads profile image functions to firebase storage**/
        const side_board_documentRef = ref(storage, `side_board/${image_file?.name}`+ uuidv4());
        const snapshot= await uploadBytes(side_board_documentRef,image_file)
        const url = await getDownloadURL(snapshot.ref);
        const payload = {
            board_id: board_id,
            image_url: url
        }
        await EditBoard(payload).then((res)=>{
            toast({title:'Success!',description:'Board Image saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            return ;
        }).catch((err)=>{
            toast({ title: 'Error!', description: 'Image could not be saved successfully', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, })
            return ;
        })
    }

    const Handle_Submit=async()=>{
        set_is_saving(true);
        if (!brand || !message || !catch_phrase || !call_to_action){
            toast({ title: 'Submission failed', description: 'Fill required fields', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_input_error(true);
            set_is_saving(false)
            return ;
        }
        if(image_file !== ''){
            await EditBoard(payload).then((res)=>{
                toast({title:'Success!',description:'Board saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
                return ;
            }).catch((err)=>{
                toast({ title: 'Error!', description: 'Board could not be updated successfully', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, })
                return ;
            })
            await HandleImageUpload(side_board_data?._id).then(()=>{
                return ;
            }).finally(()=>{
                set_page('Boards');
                set_is_saving(false);
            })
        }else{
            await EditBoard(payload).then((res)=>{
                toast({title:'Success!',description:'Board Image saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
                return ;
            }).catch((err)=>{
                toast({ title: 'Error!', description: 'Board could not be saved successfully', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, })
                return ;
            }).finally(()=>{
                set_page('Boards');
                set_is_saving(false);
            })
        }
    }
    const payload = {
        board_id: side_board_data?._id,
        side_ref_Id,
        message,
        catch_phrase,
        call_to_action,
        brand,
        season,
        category,
        email_contact,
        mobile_contact,
        website,
        address,
        orientation,
        from_date,
        to_date,
        image_url
    }
    return (
        <Box bg='#fff' borderRadius={8} mt='2' p='4'>
            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Side board Details</Text>
            <Divider/>
            <FormControl mt='2' >
                <FormLabel>Side of the board e.g 1, 2</FormLabel>
                <NumberInput defaultValue={side_ref_Id} min={1} max={board_data?.number_of_sides} onChange={((e)=>{set_side_ref_Id(e)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl mt='2' isRequired isInvalid={input_error && brand == '' ? true : false}>
                <FormLabel>Brand</FormLabel>
                <Input value={brand} placeholder='e.g Safaricom' type='text' onChange={((e)=>{set_brand(e.target.value)})}/>
                {input_error && brand == '' ? 
                    <FormErrorMessage>Name of the brand is required.</FormErrorMessage>
                : (
                    null
                )}
            </FormControl>
            <FormControl mt='2' isRequired isInvalid={input_error && message == '' ? true : false}>
                <FormLabel>Content</FormLabel>
                <Textarea value={message} placeholder='e.g Get ready for a world of opportunities' type='text' onChange={((e)=>{set_message(e.target.value)})}/>
                {input_error && message == '' ? 
                    <FormErrorMessage>Message of the board is required.</FormErrorMessage>
                : (
                    null
                )}
            </FormControl>
            <FormControl mt='2' isRequired isInvalid={input_error && catch_phrase == '' ? true : false}>
                <FormLabel>Catch phrase</FormLabel>
                <Input value={catch_phrase} placeholder='e.g Go na Safaricom' type='text' onChange={((e)=>{set_catch_phrase(e.target.value)})}/>
                {input_error && catch_phrase == '' ? 
                    <FormErrorMessage>Catch phrase of the message is required.</FormErrorMessage>
                : (
                    null
                )}
            </FormControl>
            <FormControl mt='2' isRequired isInvalid={input_error && call_to_action == '' ? true : false}>
                <FormLabel>Call to action</FormLabel>
                <Input value={call_to_action} placeholder='e.g dial *544#0#' type='text' onChange={((e)=>{set_call_to_action(e.target.value)})}/>
                {input_error && call_to_action == '' ? 
                    <FormErrorMessage>Call to action of the board is required.</FormErrorMessage>
                : (
                    null
                )}
            </FormControl>
            <Select placeholder='Select season' onChange={((e)=>{set_season(e.target.value)})} my='4'>
                <option value='End of Year'>End of Year</option>
                <option value='New Year'>New Year</option>
                <option value='Easter'>Easter</option>
                <option value='Valentine'>Valentine</option>
                <option value='Eid'>Eid</option>
                <option value='Christmas'>Christmas</option>
            </Select>
            <Select placeholder='Select category of message' onChange={((e)=>{set_category(e.target.value)})} my='4'>
                <option value='education'>Education</option>
                <option value='finance'>Finance</option>
                <option value='agriculture'>Agriculture</option>
                <option value='government'>Government</option>
                <option value='technology'>Technology</option>
                <option value='ecommerce'>Ecommerce</option>
            </Select>
            <FormControl mt='2'>
                <FormLabel>Orientation</FormLabel>
                <Input value={orientation} placeholder='e.g the board directly faces the main highway road' type='text' onChange={((e)=>{set_orientation(e.target.value)})}/>
            </FormControl>
            <FormControl mt='2'>
                <FormLabel>Email outreach</FormLabel>
                <Input value={email_contact} placeholder='e.g info@safaricom.co.ke' type='email' onChange={((e)=>{set_email_contact(e.target.value)})}/>
            </FormControl>
            <FormControl mt='2'>
                <FormLabel>mobile outreach</FormLabel>
                <Input value={mobile_contact} placeholder='e.g 07##-###-###' type='tel' onChange={((e)=>{set_mobile_contact(e.target.value)})}/>
            </FormControl>
            <FormControl mt='2'>
                <FormLabel>address outreach</FormLabel>
                <Input value={address} placeholder='e.g nairobi, kenya' type='text' onChange={((e)=>{set_address(e.target.value)})}/>
            </FormControl>
            <FormControl mt='2'>
                <FormLabel>website outreach</FormLabel>
                <Input value={website} placeholder='e.g safaricom.co.ke' type='text' onChange={((e)=>{set_website(e.target.value)})}/>
            </FormControl>
            <Flex gap='2' mt='2'>
                <FormControl>
                    <FormLabel>From date</FormLabel>
                    <Input type='date' value={from_date} placeholder='' onChange={((e)=>{set_from_date(e.target.value)})}/>
                </FormControl>
                <FormControl>
                    <FormLabel>To date</FormLabel>
                    <Input type='date' value={to_date} placeholder='' onChange={((e)=>{set_to_date(e.target.value)})}/>
                </FormControl>
            </Flex>
            <Flex direction='column' gap='2' mt='2  '>
                <Text>Select Image </Text>
                <Input p='1' type='file' placeholder='Select Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_image_file(e.target.files[0])})}/>
            </Flex>
            <Flex justify={'space-between'} align='center' mt='2'>
                <AlertUserDialog DiscardDialog={DiscardDialog}/>
                <HStack>
                {is_saving? <Button variant='ghost' isLoading loadingText={"Saving board..."}/> : <Button ml={'2'} bg='#eee' color='#000' onClick={(()=>{DiscardDialog.onToggle()})}>Discard</Button> }
                <Tooltip hasArrow label='Save baord details' placement='auto'>
                    {is_saving? <Button variant='ghost' isLoading loadingText={"Saving board..."}/> : <Button ml={'2'} bg='#3874ff' color='#fff' onClick={Handle_Submit}>Save board</Button> }
                </Tooltip>
                </HStack>
            </Flex>
        </Box>
    )
}

const AlertUserDialog=(props)=>{
    const {DiscardDialog} = {...props}
    const {set_page} = useContext(dashboardContext)
    const HandleClick=()=>{
        set_page('Boards');
        DiscardDialog.onClose();
    }
    return(
        <AlertDialog
            isOpen={DiscardDialog.isOpen}
            onClose={DiscardDialog.onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Discard Changes 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? Your changes will not be saved
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={DiscardDialog.onClose}>
                        Cancel
                    </Button>
                    <Button bg='red.300' color='white' onClick={HandleClick} ml={3}>
                        Discard
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}