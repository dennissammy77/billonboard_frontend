import { dashboardContext } from '@/components/providers/dashboard.context'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react';
import {storage} from '../../../lib/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import CreateBoard from '@/api/billboards/board/new/route.js';
import EditBoard from '@/api/billboards/board/edit/route.js';
import { UserContext } from '@/components/providers/user.context.js';

export const Addside=()=>{
    const {board_data,set_page} = useContext(dashboardContext)
    const {user} = useContext(UserContext);
    const DiscardDialog = useDisclosure();
    const toast = useToast() 

    const [brand, set_brand]=useState('');
    const [message, set_message]=useState('');
    const [catch_phrase, set_catch_phrase]=useState('');
    const [call_to_action, set_call_to_action]=useState('');
    const [side_ref_Id,set_side_ref_Id]=useState(1)
    const [season,set_season]=useState('');
    const [category,set_category]=useState('')
    const [orientation,set_orientation]=useState('')
    const [email_contact,set_email_contact]=useState('')
    const [mobile_contact,set_mobile_contact]=useState('')
    const [address,set_address]=useState('')
    const [website,set_website]=useState('')
    const [from_date,set_from_date]=useState('')
    const [to_date,set_to_date]=useState('')
    const [image_file,set_image_file]=useState('');
    const [image_url,set_image_url]=useState('https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5');

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

        if (user?.account_type === 'admin' && (user?.position === 'MANAGER' || user?.position === 'SUPER ADMIN' || user?.position === 'SALES')){
            const board_id = await HandleCreateBoard()
            if(image_file == ''){
                Clean_input_data();
                set_page('Boards');
                set_is_saving(false);
                return ;
            }
            await HandleImageUpload(board_id).then(()=>{
                return ;
            }).finally(()=>{
                Clean_input_data();
                set_page('Boards');
                set_is_saving(false);
            })
        }else if (user?.account_type === 'admin' && (user?.position !== 'MANAGER' || user?.position !== 'SUPER ADMIN' || user?.position !== 'SALES')){
            set_is_saving(false)
            return toast({title:'Error!',description:'You are not authorized to add side board',status:'error',position:'top-left',variant:'left-accent',isClosable:true});
        }
        if(user?.account_type !== 'admin'){
            const board_id = await HandleCreateBoard()
            if(image_file == ''){
                Clean_input_data();
                set_page('Boards');
                set_is_saving(false);
                return ;
            }
            await HandleImageUpload(board_id).then(()=>{
                return ;
            }).finally(()=>{
                Clean_input_data();
                set_page('Boards');
                set_is_saving(false);
            })
        }
    }

    const HandleCreateBoard=async()=>{
        const result = await CreateBoard(payload).then((response)=>{
            toast({title:'Success!',description:'Board saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            return response?.data?._id
        }).catch((err)=>{
            toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            throw new Error(err)
        })
        return result
    }
    const payload = {
        id: board_data?._id,
        data: {
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
    }

    const Clean_input_data=()=>{
        set_brand('')
        set_message('')
        set_catch_phrase('')
        set_call_to_action('')
        set_side_ref_Id(1)
        set_season('')
        set_category('')
        set_orientation('')
        set_email_contact('')
        set_mobile_contact('')
        set_address('')
        set_website('')
        set_from_date('')
        set_to_date('')
        set_image_file('')
        set_image_url('');
        set_input_error(false)
    }
    const HandleSideDetail=(e)=>{
        const data = e.target.value;
        const temp = data?.split('-');
        set_side_ref_Id(parseInt(temp[0]));
        set_orientation(temp[1]);
    }
    return (
        <Box bg='#fff' borderRadius={8} mt='2' p='4'>
            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Side board Details</Text>
            <Divider/>
            {/**
             * 
            <FormControl mt='2' >
                <FormLabel>Side of the board e.g 1, 2</FormLabel>
                <NumberInput defaultValue={1} min={1} max={board_data?.number_of_sides} onChange={((e)=>{set_side_ref_Id(e)})}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
             */}
            <Text>Select Orientation and side of the board</Text>
            <Select placeholder='eg. 1 : Faces the main road' onChange={(e)=>HandleSideDetail(e)} my='2'>
                {board_data?.sides.map((item)=>{
                    return(
                        <option value={`${item?.ref_id}` + '-' + `${item?.orientation}`}>{item?.ref_id} : {item?.orientation}</option>
                    )
                })}
            </Select>
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
                <option value='otherseason'>Other</option>
            </Select>
            <Select placeholder='Select category of message' onChange={((e)=>{set_category(e.target.value)})} my='4'>
                <option value='education'>Education</option>
                <option value='finance'>Finance</option>
                <option value='agriculture'>Agriculture</option>
                <option value='government'>Government</option>
                <option value='technology'>Technology</option>
                <option value='ecommerce'>Ecommerce</option>
                <option value='Beauty&cosmetics'>Beauty & cosmetics</option>
                <option value='business'>Business</option>
                <option value='beverages'>Beverages</option>
                <option value='government'>Government</option>
                <option value='othercategory'>Other</option>
            </Select>
            {/**
             * 
            <FormControl mt='2'>
                <FormLabel>Orientation</FormLabel>
                <Input value={orientation} placeholder='e.g the board directly faces the main highway road' type='email' onChange={((e)=>{set_orientation(e.target.value)})}/>
            </FormControl>
             */}
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
                <AlertUserDialog DiscardDialog={DiscardDialog} Clean_input_data={Clean_input_data}/>
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
        props.Clean_input_data();
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
                        Discard Board 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
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