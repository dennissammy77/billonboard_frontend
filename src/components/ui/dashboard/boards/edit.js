import { AbsoluteCenter, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Text, Textarea, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/providers/user.context";
import { dashboardContext } from "@/components/providers/dashboard.context";
import EditBoard from "@/api/billboards/edit/route";
import getPosition from "@/components/hooks/GetLocation";
import { CiLocationOff } from "react-icons/ci";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import GetAgencies from "@/api/auth/client/agency/all/route";
import { IoSearch } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import detectCoordinateFormat from "@/components/hooks/GeoLocationDataHandler";

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

    const [Latitude,set_Latitude]=useState(board_data?.location_cord?.Latitude,);
    const [Longitude,set_Longitude]=useState(board_data?.location_cord?.Longitude);
    let location_cord = {
        Latitude,
        Longitude
    }
    const [number_of_sides,set_number_of_sides]=useState(board_data?.number_of_sides);
    const [side_info_input_fields,set_side_info_input_fields]=useState(board_data?.sides);
    
    const [availability_status,set_availability_status]=useState(board_data?.availability_status);
    const [billboard_type,set_billboard_type]=useState(board_data?.billboard_type);

    const [currently_owned_by,set_currently_owned_by]=useState({ Name: board_data?.currently_owned_by?.Name, owner_id: board_data?.currently_owned_by?.owner_id, account_type: board_data?.currently_owned_by?.account_type });
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
    const [lister_edit_status,set_lister_edit_status]=useState(board_data?.lister_edit_status);
    
    const [is_saving,set_is_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const [agencies,set_agencies]=useState([]);
    const viewAgencies = useDisclosure();
    const HandleSelectAgency=(agency)=>{
        set_ad_agency_name(agency?.company_name)
        set_ad_agency_email(agency?.company_email)
        set_ad_agency_address(agency?.company_address)
        set_ad_agency_mobile(agency?.company_mobile)
        set_currently_owned_by({ Name: agency?.company_name, owner_id: agency?._id, account_type: 'agency' });
    }
    useEffect(()=>{
        const fetch=async()=>{
            await GetAgencies().then((response)=>{
              const arr = response?.data;
              set_agencies(arr)
            }).catch((err)=>{
              console.log(err)
            })
          }
        if(user?.account_type === 'agency'){
            HandleSelectAgency(user)   
        }else{
            fetch()
        }
    },[user,user?.account_type]);


    // const payload = {
    //     id: board_data?._id,
    //     name_of_billboard,
    //     description,
    //     location,
    //     location_cord,
    //     number_of_sides,
    //     sides: side_info_input_fields,
    //     availability_status,
    //     billboard_type,
    //     ad_agency_name,
    //     ad_agency_email,
    //     ad_agency_mobile,
    //     ad_agency_address,
    //     ad_agency_website,
    //     bob_rating,
    //     bob_remark,
    //     currently_owned_by,
    //     verification_status,
    //     suspension_status,
    //     publish_status,
    //     side_info_flag: true,
    //     lister_edit_status
    // }

    const Handle_Submit=async()=>{
        set_is_saving(true);
        if(!name_of_billboard || !description || !location || !ad_agency_name){
            set_input_error(true);
            set_is_saving(false)
            return toast({title:'Error!',description:'Ensure all required inputs are filled',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }

        if(user?.account_type === 'footsoldier' && !board_data?.lister_edit_status){
            set_is_saving(false)
            return toast({title:'Error!:You are not authorized to make changes to this billboard',description:'Contact support or request for change permissions from the agency',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        if (parseInt(number_of_sides) !== side_info_input_fields.length){
            set_is_saving(false)
            return toast({title:'Error!',description:'Ensure all sides have been described',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }
        const geo_cord_validator = detectCoordinateFormat(Latitude.concat(Longitude));
        let location_cord ;
        if (geo_cord_validator === 'Unknown'){
            return toast({title:'Error!:Invalid Location coordinate format',description:`e.g use the format(38° 53' 23" N) (77° 00' 32.5" W) or (38.88972222222222) (-77.00902777777777)`,status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }else if(geo_cord_validator == 'dd'){
            location_cord = {
                Latitude,
                Longitude
            };
        }else{
            location_cord = {
                Latitude: geo_cord_validator.split(",")[0],
                Longitude: geo_cord_validator.split(",")[1]
            };
        }

        const payload = {
            id: board_data?._id,
            name_of_billboard,
            description,
            location,
            location_cord,
            number_of_sides,
            sides: side_info_input_fields,
            availability_status,
            billboard_type,
            ad_agency_name,
            ad_agency_email,
            ad_agency_mobile,
            ad_agency_address,
            ad_agency_website,
            bob_rating,
            bob_remark,
            currently_owned_by,
            verification_status,
            suspension_status,
            publish_status,
            side_info_flag: true,
            lister_edit_status
        }
        if (user?.account_type === 'admin' && (user?.position === 'MANAGER' || user?.position === 'SUPER ADMIN' || user?.position === 'SALES')){
            await EditBoard(payload).then(()=>{
                set_page('Boards');
                return toast({title:'Success!',description:'Billboard saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            }).catch((err)=>{
                console.log(err)
                return toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            }).finally(()=>{
                set_is_saving(false)
            })
        }else if (user?.account_type === 'admin' && (user?.position !== 'MANAGER' || user?.position !== 'SUPER ADMIN' || user?.position !== 'SALES')){
            set_is_saving(false)
            return toast({title:'Error!',description:'You are not authorized to update billboards',status:'error',position:'top-left',variant:'left-accent',isClosable:true});
        }
        if(user?.account_type !== 'admin'){
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
    }

    const HandleGetLocation=async()=>{
        const result = await getPosition();
        set_Latitude(result.Latitude)
        set_Longitude(result.Longitude)
    }
    const HandleRemoveLocation=async()=>{
        set_Latitude(''),
        set_Longitude('')
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
    const ValidateCoordinates=()=>{
        const geo_cord_validator = detectCoordinateFormat(Latitude.concat(Longitude));
        let location_cord ;
        if (geo_cord_validator === 'Unknown'){
            return toast({title:'Error!:Invalid Location coordinate format',description:`use the format(38° 53' 23" N) (77° 00' 32.5" W) or (38.88972222222222) (-77.00902777777777)`,status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
        }else if(geo_cord_validator == 'dd'){
            location_cord = {
                Latitude,
                Longitude
            }
            console.log(location_cord)
        }else{
            location_cord = {
                Latitude: geo_cord_validator.split(",")[0],
                Longitude: geo_cord_validator.split(",")[1]
            }
            console.log(location_cord)
        }
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
                    <Flex>
                        <FormControl mt='2' mr='2'>
                            <FormLabel>Latitude</FormLabel>
                            <Input placeholder={location_cord?.Latitude} type='text' onChange={((e)=>{set_Latitude(e.target.value)})}/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Longitude</FormLabel>
                            <Input placeholder={location_cord?.Longitude} type='text' onChange={((e)=>{set_Longitude(e.target.value)})}/>
                        </FormControl>
                    </Flex>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Board Owner Details</Text>
                    <Button onClick={viewAgencies.onToggle} leftIcon={<IoSearch/>} rightIcon={viewAgencies.isOpen ? <FaChevronUp /> : <FaChevronDown/>} w='full' my='3'>Find existing agency</Button>
                    <Collapse in={viewAgencies.isOpen} animateOpacity>
                        <Box p='10px'>
                            {agencies?.map((agency,index)=>{
                                return(
                                    <Text key={index} onClick={(()=>{HandleSelectAgency(agency);viewAgencies.onToggle()})} p='2' bg='#eee' my='1' cursor={'pointer'}>{agency?.company_name}</Text>
                                )
                            })}
                        </Box>
                    </Collapse>
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
                {user?.account_type === 'admin'?
                    <>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Verification status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='verification' mb='0'>
                                    {verification_status? 'Un Verify Board' : 'Verify Board'}
                                </FormLabel>
                                <Switch id='verification' onChange={(()=>{set_verification_status(!verification_status)})}/>
                            </FormControl>
                        </Box>
                        <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                            <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Suspension status</Text>
                            <Divider/>
                            <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                                <FormLabel htmlFor='suspension' mb='0'>
                                    {suspension_status? 'Activate Board' : 'Suspend Board'}
                                </FormLabel>
                                <Switch id='suspension' onChange={(()=>{set_suspension_status(!suspension_status)})}/>
                            </FormControl>
                        </Box>
                    </>
                    : null
                }
                {user?.account_type === 'footsoldier'?
                    null:
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#3874ff'>Lister Edit Status</Text>
                        <Divider/>
                        <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                            <FormLabel htmlFor='lister edit status' mb='0'>
                                {lister_edit_status? 'Allow lister to make changes' : 'Prevent Lister from making changes'}
                            </FormLabel>
                            <Switch id='lister edit status' onChange={(()=>{set_lister_edit_status(!lister_edit_status)})}/>
                        </FormControl>
                    </Box>
                }
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