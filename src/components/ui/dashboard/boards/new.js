import { AbsoluteCenter, Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Text, Textarea, Tooltip, Wrap, useDisclosure, useToast } from "@chakra-ui/react"
import { Notification } from "../alert.ui";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/providers/user.context";
import { dashboardContext } from "@/components/providers/dashboard.context";
import CreateNewBoard from "@/api/billboards/new/route";
import { GrMapLocation } from "react-icons/gr";
import getPosition from "@/components/hooks/GetLocation";
import { FaLocationPin } from "react-icons/fa6";
import { CiLocationOff } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import GetAgencies from "@/api/auth/client/agency/all/route";
import { IoSearch } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const New_Board=()=>{
    const {user} = useContext(UserContext);
    return(
        <Box p='2'>
            {(!user?.verification_status || !user?.verified_email_status || user?.account_suspension_status) && user?.account_type !== 'admin'? 
                <Notification />
            :   <Body/> }
        </Box>
    )
}

const Body=()=>{
    const toast = useToast();
    const {set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const DiscardDialog = useDisclosure()

    // billboard details 
    const [name_of_billboard,set_name_of_billboard]=useState('');
    const [description,set_description]=useState('');
    const [location,set_location]=useState('');
    const [location_cord,set_location_cord]=useState({
        Latitude : '',
        Longitude : ''
    });
    const [number_of_sides,set_number_of_sides]=useState(1);
    
    const [side_info_input_fields,set_side_info_input_fields]=useState([{
        ref_id:'',
        orientation: ''
    }]);

    const [img_placeholder,set_img_placeholder]=useState('https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5');
    const [availability_status,set_availability_status]=useState(false);
    const [billboard_type,set_billboard_type]=useState('');

    // agency details
    const [ad_agency_name,set_ad_agency_name]=useState('');
    const [ad_agency_email,set_ad_agency_email]=useState('');
    const [ad_agency_mobile,set_ad_agency_mobile]=useState('');
    const [ad_agency_address,set_ad_agency_address]=useState('');
    const [ad_agency_website, set_ad_agency_website]=useState('');
    // lister details
    const [listed_by,set_listed_by]=useState({ Name: user?.first_name, lister_id: user?._id, account_type: user?.account_type });

    const [currently_owned_by,set_currently_owned_by]=useState({ Name: user?.first_name, owner_id: user?._id, account_type: user?.account_type });
    // rating
    const [bob_rating,set_bob_rating]=useState(1);
    const [bob_remark,set_bob_remark]=useState('');

    const [verification_status,set_verification_status]=useState(false);
    const [suspension_status,set_suspension_status]=useState(false);
    const [publish_status,set_publish_status]=useState(false);
    
    const [is_saving,set_is_saving]=useState(false);
    const [is_side_upload, set_is_side_upload]=useState(false)

    const [input_error,set_input_error]=useState(false);

    const [agencies,set_agencies]=useState([]);
    const viewAgencies = useDisclosure()
    useEffect(()=>{
        if(user?.account_type === 'agency'){
            HandleSelectAgency(user)   
        }else{
            fetch()
        }
      },[])
    async function fetch(){
        await GetAgencies().then((response)=>{
          const arr = response?.data;
          set_agencies(arr)
        }).catch((err)=>{
          console.log(err)
        })
      }
    const HandleSelectAgency=(agency)=>{
        set_ad_agency_name(agency?.company_name)
        set_ad_agency_email(agency?.company_email)
        set_ad_agency_address(agency?.company_address)
        set_ad_agency_mobile(agency?.company_mobile)
        set_currently_owned_by({ Name: agency?.company_name, owner_id: agency?._id, account_type: 'agency' });
    }
    const payload = {
        name_of_billboard,
        description,
        location, 
        location_cord,
        number_of_sides,
        sides: side_info_input_fields,
        img_placeholder,
        availability_status,
        billboard_type,
        ad_agency_name,
        ad_agency_email,
        ad_agency_mobile,
        ad_agency_address,
        ad_agency_website,
        listed_by,
        currently_owned_by,
        bob_rating,
        bob_remark,
        verification_status,
        suspension_status,
        publish_status,
        lister_edit_status : true
    }

    const Handle_Submit=async()=>{
        set_is_saving(true);
        if(!ad_agency_name){
            set_input_error(true);
            set_is_saving(false)
            return toast({title:'Error!',description:`${user?.account_type === 'agency'? 'You need to complete your profile before creating a new billboard': 'please select an agency with a complete profile'}`,status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        if(!name_of_billboard || !description || !location || !ad_agency_name){
            set_input_error(true);
            set_is_saving(false)
            return toast({title:'Error!',description:'Ensure all inputs are filled',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        if (number_of_sides !== side_info_input_fields.length){
            set_is_saving(false)
            return toast({title:'Error!',description:'Ensure all sides have been described',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        if (user?.account_type === 'admin' && (user?.position === 'MANAGER' || user?.position === 'SUPER ADMIN' || user?.position === 'SALES')){
            await CreateNewBoard(payload).then(()=>{
                Clean_input_data();
                set_page('Boards');
                return toast({title:'Success!',description:'Board saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            }).catch((err)=>{
                return toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            }).finally(()=>{
                set_is_saving(false)
            })
        }else if (user?.account_type === 'admin' && (user?.position !== 'MANAGER' || user?.position !== 'SUPER ADMIN' || user?.position !== 'SALES')){
            set_is_saving(false)
            return toast({title:'Error!',description:'You are not authorized to create billboards',status:'error',position:'top-left',variant:'left-accent',isClosable:true});
        }
        if(user?.account_type !== 'admin'){
            await CreateNewBoard(payload).then(()=>{
                Clean_input_data();
                set_page('Boards');
                return toast({title:'Success!',description:'Board saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            }).catch((err)=>{
                return toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            }).finally(()=>{
                set_is_saving(false)
            })
        }
    }
    const Clean_input_data=()=>{
        set_name_of_billboard('')
        set_description('')
        set_location('')
        set_number_of_sides('')
        set_img_placeholder('')
        set_availability_status(false)
        set_ad_agency_name('')
        set_ad_agency_email('')
        set_ad_agency_mobile('')
        set_ad_agency_address('')
        set_ad_agency_website('')
        set_listed_by({ Name: user?.first_name, lister_id: user?._id, account_type: user?.account_type })
        set_currently_owned_by({ Name: user?.first_name, owner_id: user?._id, account_type: user?.account_type })
        set_bob_rating(0)
        set_bob_remark('')
        set_verification_status(false)
        set_suspension_status(false)
        set_publish_status(false)
        HandleRemoveLocation()
    }

    const HandleGetLocation=async()=>{
        const result = await getPosition();
        set_location_cord(result);
    }
    const HandleRemoveLocation=async()=>{
        set_location_cord({
            Latitude : '',
            Longitude : ''
        });
    };

    const HandleFormChange = (index, event) => {
        let data = [...side_info_input_fields];
        data[index]['ref_id'] = index + 1;
        data[index]['orientation'] = event.target.value;
        set_side_info_input_fields(data)
    }

    const HandleAddNewSideInputField=()=>{
        if(number_of_sides == side_info_input_fields?.length){
            toast({title:'Error: Could not add new field!',description:'Side boards limit has been reached add a side to perform action.',status:'warning',position:'top-left',variant:'left-accent'})
            return;
        }
        let new_side_info_field = {ref_id: '',orientation:''};
        set_side_info_input_fields([...side_info_input_fields,new_side_info_field])
    }

    const removeFields = (index) => {
        let data = [...side_info_input_fields];
        data.splice(index, 1)
        set_side_info_input_fields(data)
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={'md'} boxShadow={'sm'} p='2' mb='2'>
                <Text fontSize={'xl'}>Create a New Board</Text>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Boards')})}>Boards</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>New Board</BreadcrumbLink>
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
                    <FormControl my='2'>
                        <FormLabel>Number of sides</FormLabel>
                        <NumberInput defaultValue={1} min={1} onChange={((e)=>{set_number_of_sides(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <form>
                        {side_info_input_fields.map((input, index) => {
                            return (
                                <HStack key={index} my='2'>
                                    <Input name='ref_id' type='number' placeholder='side number e.g 1, 2 ...' w='20%' value={index+1} onChange={event => HandleFormChange(index, event)}/>
                                    <Input name='orientation' placeholder='e.g The billboard is facing the main highway' value={input.orientation} onChange={event => HandleFormChange(index, event)}/>
                                    {index == 0 ? <Icon as={IoMdRemoveCircleOutline} boxSize={"6"} cursor={'pointer'} color={'gray.300'}/> : <Icon as={IoMdRemoveCircleOutline} boxSize={"6"} cursor={'pointer'} onClick={() => removeFields(index)}/> }
                                </HStack>
                            )
                        })}
                    </form>
                    <Button onClick={HandleAddNewSideInputField} my='2'>Add field</Button>
                    <Select placeholder='Select type of billboard' onChange={((e)=>{set_billboard_type(e.target.value)})} my='4'>
                        <option value='digital'>Digital</option>
                        <option value='2D'>2D</option>
                    </Select>
                    {user?.account_type === 'admin'?
                        <>
                            <FormControl mt='2'>
                                <FormLabel>Bob Rating</FormLabel>
                                <NumberInput defaultValue={1} min={1} max={5} onChange={((e)=>{set_bob_rating(e)})}>
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
                    <Flex gap='2' align={'center'}>
                        <HStack p='4' bg={location_cord.Latitude == '' ? '#b3c8ff' : 'green.200'} border='1px solid gray.200' borderRadius={'md'} cursor='pointer' my='2' onClick={HandleGetLocation} flex='1'>
                            <Icon as={FaLocationPin} boxSize={4}/>
                            <Text>{location_cord.Latitude == '' ? 'Click to pin the location of this billboard' : 'Billboard has been pinned on map'}</Text>
                        </HStack>
                        {location_cord.Latitude == '' ? 
                            <IconButton icon={<CiLocationOff/>} variant='ghost' colorScheme={'red'} aria-label={'remove pin'} cursor='pointer' isDisabled/>
                            :
                            <IconButton icon={<CiLocationOff/>} variant='outline' colorScheme={'red'} aria-label={'remove pin'} cursor='pointer' onClick={HandleRemoveLocation} />
                        }
                    </Flex>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                            or
                        </AbsoluteCenter>
                    </Box>
                    <Text fontWeight={'bold'} color='gray' fontSize={'small'} textAlign={'center'}>Update the location later</Text>
                </Box>
                {user?.account_type === 'agency'?
                    null 
                    :
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Board Owner Details</Text>
                        <Button onClick={viewAgencies.onToggle} leftIcon={<IoSearch/>} rightIcon={viewAgencies.isOpen ? <FaChevronUp /> : <FaChevronDown/>} w='full' my='3'>Find existing agency</Button>
                        <Collapse in={viewAgencies.isOpen} animateOpacity>
                            <Box p='10px'>
                                {agencies?.map((agency)=>{
                                    return(
                                        <Text onClick={(()=>{HandleSelectAgency(agency);viewAgencies.onToggle()})} p='2' bg='#eee' my='1' cursor={'pointer'}>{agency?.company_name}</Text>
                                    )
                                })}
                            </Box>
                        </Collapse>
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
                    <AlertUserDialog DiscardDialog={DiscardDialog} Clean_input_data={Clean_input_data}/>
                    <Box mt='2' align='end' gap='2'>
                        <Tooltip hasArrow label='Save baord details and add boards later' placement='auto'>
                            {is_saving? <Button variant='ghost' isLoading loadingText={publish_status? 'Publishing' : "Saving draft..."}/> : <Button ml={'2'} bg='#3874ff' color='#fff' onClick={Handle_Submit} >Save BillBoard</Button> }
                        </Tooltip>
                    </Box>
                </Flex>
            </Box>
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