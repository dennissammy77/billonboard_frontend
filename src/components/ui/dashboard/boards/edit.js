import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Text, Textarea, Tooltip, Wrap, useDisclosure, useToast } from "@chakra-ui/react"
import { Notification } from "../alert.ui";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/providers/user.context";
import { dashboardContext } from "@/components/providers/dashboard.context";
import EditBoard from "@/api/billboards/edit/route";

export const Edit_Board=()=>{
    return(
        <Box p='2'>
            <Body/>
        </Box>
    )
}

const Body=()=>{
    const toast = useToast();
    const {board_data,set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    
    const DiscardDialog = useDisclosure();

    // billboard details 
    const [name_of_billboard,set_name_of_billboard]=useState(board_data?.name_of_billboard);
    const [description,set_description]=useState(board_data?.description);
    const [location,set_location]=useState(board_data?.location);
    const [location_cord,set_location_cord]=useState({Latitude:'',Longitude:''});
    const [number_of_sides,set_number_of_sides]=useState(board_data?.number_of_sides);
    const [availability_status,set_availability_status]=useState(board_data?.availability_status);
    const [billboard_type,set_billboard_type]=useState(board_data?.billboard_type);

    // agency details
    const [ad_agency_name,set_ad_agency_name]=useState(board_data?.ad_agency_name);
    const [ad_agency_email,set_ad_agency_email]=useState(board_data?.ad_agency_email);
    const [ad_agency_mobile,set_ad_agency_mobile]=useState(board_data?.ad_agency_mobile);
    const [ad_agency_address,set_ad_agency_address]=useState(board_data?.ad_agency_address);
    const [ad_agency_website, set_ad_agency_website]=useState(board_data?.ad_agency_website);
    // lister details
    // rating
    const [bob_rating,set_bob_rating]=useState(board_data?.bob_rating);
    const [bob_remark,set_bob_remark]=useState(board_data?.bob_remark);

    const [verification_status,set_verification_status]=useState(board_data?.verification_status);
    const [suspension_status,set_suspension_status]=useState(board_data?.suspension_status);
    const [publish_status,set_publish_status]=useState(board_data?.publish_status);
    
    const [is_saving,set_is_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const payload = {
        id: board_data?._id,
        name_of_billboard,
        description,
        location,
        location_cord,
        number_of_sides,
        availability_status,
        billboard_type,
        ad_agency_name,
        ad_agency_email,
        ad_agency_mobile,
        ad_agency_address,
        ad_agency_website,
        bob_rating,
        bob_remark,
        verification_status,
        suspension_status,
        publish_status
    }

    const Handle_Submit=async()=>{
        set_is_saving(true)
        if(!name_of_billboard || !description || !location || !ad_agency_name){
            set_input_error(true);
            set_is_saving(false)
            return toast({title:'Error!',description:'Ensure all required inputs are filled',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        await EditBoard(payload).then(()=>{
            set_page('Boards');
            return toast({title:'Success!',description:'Billboard saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
        }).catch((err)=>{
            console.log(err)
            return toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
        }).finally(()=>{
            set_is_saving(false)
        })
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={'md'} boxShadow={'sm'} p='2' mb='2'>
                <Text fontSize={'xl'}>Edit Board</Text>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Boards')})}>Boards</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>{name_of_billboard}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Board Details</Text>
                    <Divider/>
                    <FormControl mt='2' isRequired isInvalid={input_error && name_of_billboard == '' ? true : false}>
                        <FormLabel>Name</FormLabel>
                        <Input value={name_of_billboard} placeholder='Name of the billboard' type='text' onChange={((e)=>{set_name_of_billboard(e.target.value)})}/>
                        {input_error && name_of_billboard == '' ? 
                            <FormErrorMessage>Name of the billboard is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2' isRequired isInvalid={input_error && description == '' ? true : false}>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={description} type='text' placeholder='Give a detailed description of the billboard' onChange={((e)=>{set_description(e.target.value)})}/>
                        {input_error && description == '' ?  <FormErrorMessage>Description of the billboard is required.</FormErrorMessage> : ( null )}
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Number of sides</FormLabel>
                        <NumberInput defaultValue={number_of_sides} min={1} onChange={((e)=>{set_number_of_sides(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <Select placeholder='Select type of billboard' onChange={((e)=>{set_billboard_type(e.target.value)})} my='4'>
                        <option value='digital'>Digital</option>
                        <option value='2D'>2D</option>
                    </Select>
                    {user?.account_type === 'admin'?
                        <>
                            <FormControl mt='2'>
                                <FormLabel>Bob Rating</FormLabel>
                                <NumberInput defaultValue={bob_rating} min={1} max={5} onChange={((e)=>{set_bob_rating(e)})}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl mt='2'>
                                <FormLabel>Remark</FormLabel>
                                <Textarea value={bob_remark} type='text' placeholder='leave a profesional remark' onChange={((e)=>{set_bob_remark(e.target.value)})}/>
                            </FormControl>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2' fontSize={'sm'}>
                                <FormLabel>{availability_status? 'Board is available' : 'Make board available'}</FormLabel>
                                <Switch id='availabity status' onChange={(()=>{set_availability_status(!availability_status)})}/>
                            </FormControl>
                        </>
                        : null
                    }
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Location Details</Text>
                    <Divider/>
                    <FormControl mt='2' isRequired isInvalid={input_error && location == '' ? true : false}>
                        <FormLabel>Location</FormLabel>
                        <Input value={location} placeholder='e.g along thika road' type='text' onChange={((e)=>{set_location(e.target.value)})}/>
                        {input_error && location == '' ? 
                            <FormErrorMessage>Location of the billboard is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Board Owner Details</Text>
                    <Divider/>
                    <FormControl mt='2' isRequired isInvalid={input_error && ad_agency_name == '' ? true : false}>
                        <FormLabel>Name</FormLabel>
                        <Input value={ad_agency_name} placeholder='e.g BillonBoard' type='text' onChange={((e)=>{set_ad_agency_name(e.target.value)})}/>
                        {input_error && ad_agency_name == '' ? 
                            <FormErrorMessage>Name of the agency is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Email</FormLabel>
                        <Input value={ad_agency_email} placeholder='e.g info@billonboard.co.ke' type='email' onChange={((e)=>{set_ad_agency_email(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Mobile</FormLabel>
                        <Input value={ad_agency_mobile} placeholder='e.g 07##-###-###' type='tel' onChange={((e)=>{set_ad_agency_mobile(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Address</FormLabel>
                        <Input value={ad_agency_address} placeholder='e.g Nairobi,kenya' type='text' onChange={((e)=>{set_ad_agency_address(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Website</FormLabel>
                        <Input value={ad_agency_website} placeholder='e.g www.billonboard.co.ke' type='text' onChange={((e)=>{set_ad_agency_website(e.target.value)})}/>
                    </FormControl>
                </Box>
                {user?.account_type === 'admin'?
                    <>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Ownership Details</Text>
                            <Divider/>
                        </Box>  
                    </>
                    : null
                }
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Board status</Text>
                    <Divider/>
                    <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                        <FormLabel htmlFor='short_on_expiry_status' mb='0'>
                            {publish_status? 'Board will be published' : 'Board will be saved as draft'}
                        </FormLabel>
                        <Switch id='short_on_expiry_status' onChange={(()=>{set_publish_status(!publish_status)})}/>
                    </FormControl>
                </Box>
                <Flex justify={'space-between'} align='center'>
                    <Text cursor={'pointer'} onClick={(()=>{DiscardDialog.onToggle()})}>Discard</Text>
                    <Box mt='2' align='end' gap='2'>
                        <Tooltip hasArrow label='Save billboard details' placement='auto'>
                            {is_saving? <Button variant='ghost' isLoading loadingText={publish_status? 'Publishing' : "Saving draft..."}/> : <Button ml={'2'} bg='#3874ff' color='#fff' onClick={Handle_Submit} >Save BillBoard</Button> }
                        </Tooltip>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}